import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export enum SidebarMode {
    NORMAL = 'normal',
    COMPACT = 'compact',
}

export interface SidebarState {
    isVisible: boolean;
    mode: SidebarMode;
    isSubSidebarOpen: boolean;
    previousMode?: SidebarMode;
}

export interface MenuItem {
    id: string;
    label: string;
    icon: string;
    route?: string;
    children?: MenuItem[];
    badge?: number;
    command?: () => void;
}

export interface MenuSection {
    title: string;
    items: MenuItem[];
}

@Injectable({ providedIn: 'root' })
export class SidebarService {
    // Private BehaviorSubjects for state management
    private readonly modeSubject = new BehaviorSubject<SidebarMode>(SidebarMode.NORMAL);
    private readonly visibilitySubject = new BehaviorSubject<boolean>(true);
    private readonly subSidebarOpenSubject = new BehaviorSubject<boolean>(false);
    private readonly selectedItemIdSubject = new BehaviorSubject<string | null>(null);
    private readonly previousModeSubject = new BehaviorSubject<SidebarMode | undefined>(undefined);
    private readonly subMenuItemsSubject = new BehaviorSubject<MenuItem[]>([]);
    private readonly subSidebarTitleSubject = new BehaviorSubject<string>('');
    private readonly selectedItemIdsSubject = new BehaviorSubject<Set<string>>(new Set());
    private readonly hasActiveRouteSubject = new BehaviorSubject<boolean>(false);

    // Store complete menu structure for hierarchy tracking
    private menuStructure: MenuSection[] = [];

    // Public observables
    readonly currentMode$: Observable<SidebarMode> = this.modeSubject.asObservable();
    readonly isVisible$: Observable<boolean> = this.visibilitySubject.asObservable();
    readonly isSubSidebarOpen$: Observable<boolean> = this.subSidebarOpenSubject.asObservable();
    readonly selectedItemId$: Observable<string | null> = this.selectedItemIdSubject.asObservable();
    readonly subMenuItems$: Observable<MenuItem[]> = this.subMenuItemsSubject.asObservable();
    readonly subSidebarTitle$: Observable<string> = this.subSidebarTitleSubject.asObservable();
    readonly selectedItemIds$: Observable<Set<string>> = this.selectedItemIdsSubject.asObservable();
    readonly hasActiveRoute$: Observable<boolean> = this.hasActiveRouteSubject.asObservable();

    // Combined state observable
    readonly sidebarState$: Observable<SidebarState> = new Observable<SidebarState>((observer) => {
        const subscription = this.modeSubject.subscribe(() => {
            observer.next({
                isVisible: this.visibilitySubject.value,
                mode: this.modeSubject.value,
                isSubSidebarOpen: this.subSidebarOpenSubject.value,
                previousMode: this.previousModeSubject.value,
            });
        });
        return () => subscription.unsubscribe();
    });

    /**
     * Toggle between normal and compact modes
     * Does nothing if sub-sidebar is open
     */
    toggleMode(): void {
        if (this.subSidebarOpenSubject.value) {
            this.closeSubSidebar();
        }

        const currentMode = this.modeSubject.value;
        const newMode = currentMode === SidebarMode.NORMAL ? SidebarMode.COMPACT : SidebarMode.NORMAL;
        this.modeSubject.next(newMode);
    }

    /**
     * Set sidebar mode directly
     * Does nothing if sub-sidebar is open
     */
    setMode(mode: SidebarMode): void {
        if (this.subSidebarOpenSubject.value) {
            // Cannot change mode while sub-sidebar is open
            if (typeof console !== 'undefined' && console.warn) {
                console.warn('Cannot change sidebar mode while sub-sidebar is open');
            }
            return;
        }

        this.modeSubject.next(mode);
    }

    /**
     * Toggle sidebar visibility
     */
    toggleVisibility(): void {
        const currentVisibility = this.visibilitySubject.value;
        this.visibilitySubject.next(!currentVisibility);
    }

    /**
     * Show the sidebar
     */
    show(): void {
        this.visibilitySubject.next(true);
    }

    /**
     * Hide the sidebar
     */
    hide(): void {
        this.visibilitySubject.next(false);
    }

    /**
     * Open sub-sidebar with menu items
     * Stores current mode and forces compact mode
     */
    openSubSidebar(items: MenuItem[] = [], title: string = ''): void {
        // Store current mode before forcing compact
        const currentMode = this.modeSubject.value;
        this.previousModeSubject.next(currentMode);

        // Set sub-sidebar content
        this.subMenuItemsSubject.next(items);
        this.subSidebarTitleSubject.next(title);

        // Force compact mode
        this.modeSubject.next(SidebarMode.COMPACT);

        // Mark sub-sidebar as open
        this.subSidebarOpenSubject.next(true);
    }

    /**
     * Close sub-sidebar
     * Restores previous mode and clears sub-menu items
     */
    closeSubSidebar(): void {
        // Mark sub-sidebar as closed
        this.subSidebarOpenSubject.next(false);

        // Clear sub-sidebar content
        this.subMenuItemsSubject.next([]);
        this.subSidebarTitleSubject.next('');

        // Restore previous mode if it exists
        const previousMode = this.previousModeSubject.value;
        if (previousMode !== undefined) {
            this.modeSubject.next(previousMode);
            this.previousModeSubject.next(undefined);
        }
    }

    /**
     * Set the selected menu item
     */
    setSelectedItem(itemId: string | null): void {
        this.selectedItemIdSubject.next(itemId);
    }

    /**
     * Set whether there's an active route (used to show/hide content header)
     */
    setHasActiveRoute(hasRoute: boolean): void {
        this.hasActiveRouteSubject.next(hasRoute);
    }
}
