import { Injectable, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

/**
 * Represents a menu item in the navigation system
 */
export interface MenuItem {
    id: string;
    label: string;
    icon: string;
    route?: string;
    children?: MenuItem[];
    badge?: number;
    command?: () => void;
    disabled?: boolean;
}

/**
 * Represents a section of menu items with a title
 */
export interface MenuSection {
    title: string;
    items: MenuItem[];
}

/**
 * Represents the complete navigation state
 */
export interface NavigationState {
    // Display mode: normal (icon + label) or compact (icon only)
    displayMode: 'normal' | 'compact';

    // Positioning mode: relative (in layout) or overlay (floating)
    positioningMode: 'relative' | 'overlay';

    // Main sidebar visibility (used in overlay mode)
    isMainSidebarVisible: boolean;

    // Sub sidebar state
    isSubSidebarOpen: boolean;
    subSidebarItems: MenuItem[];
    subSidebarTitle: string;
    subSidebarParentRoute: string | null;

    // Selection tracking
    selectedItemId: string | null;
    selectedItemPath: string[]; // Array of IDs from root to selected item

    // Active route tracking
    activeRoute: string | null;

    // Previous state for restoration
    previousDisplayMode: 'normal' | 'compact' | null;
}

/**
 * Service for managing navigation sidebar state and behavior
 * Provides centralized state management for main sidebar, sub-sidebar, and menu navigation
 */
@Injectable({
    providedIn: 'root',
})
export class NavigationService implements OnDestroy {
    // Private BehaviorSubjects for state management
    private readonly displayModeSubject = new BehaviorSubject<'normal' | 'compact'>('normal');
    private readonly positioningModeSubject = new BehaviorSubject<'relative' | 'overlay'>('relative');
    private readonly isMainSidebarVisibleSubject = new BehaviorSubject<boolean>(true);
    private readonly isSubSidebarOpenSubject = new BehaviorSubject<boolean>(false);
    private readonly subSidebarItemsSubject = new BehaviorSubject<MenuItem[]>([]);
    private readonly subSidebarTitleSubject = new BehaviorSubject<string>('');
    public subSidebarParentRouteSubject = new BehaviorSubject<string | null>(null);
    private readonly selectedItemIdSubject = new BehaviorSubject<string | null>(null);
    private readonly selectedItemPathSubject = new BehaviorSubject<string[]>([]);
    private readonly activeRouteSubject = new BehaviorSubject<string | null>(null);
    private readonly previousDisplayModeSubject = new BehaviorSubject<'normal' | 'compact' | null>(null);

    // Subject for cleanup
    private readonly destroy$ = new Subject<void>();

    // Breakpoint threshold for mobile/desktop
    private readonly MOBILE_BREAKPOINT = '(max-width: 768px)';

    // Menu configuration
    private readonly menuSectionsSubject = new BehaviorSubject<MenuSection[]>([]);
    public readonly menuSections$: Observable<MenuSection[]> = this.menuSectionsSubject.asObservable();

    // Complete menu structure with all sections and items
    private readonly menuConfiguration: MenuSection[] = [
        {
            title: 'MAIN',
            items: [
                {
                    id: 'customers',
                    label: 'Customers',
                    icon: 'pi-users',
                    route: '/customers',
                    children: [
                        {
                            id: 'basic-details',
                            label: 'Basic Details',
                            icon: 'pi-info-circle',
                            route: '/customers/basic-details'
                        },
                        {
                            id: 'facility-details',
                            label: 'Facility Details',
                            icon: 'pi-building',
                            route: '/customers/facility-details'
                        },
                        {
                            id: 'other-parties',
                            label: 'Other Parties',
                            icon: 'pi-users',
                            route: '/customers/other-parties'
                        },
                        {
                            id: 'security-details',
                            label: 'Security Details',
                            icon: 'pi-shield',
                            route: '/customers/security-details'
                        },
                        {
                            id: 'functioning-unit-status',
                            label: 'Functioning Unit Status',
                            icon: 'pi-check-circle',
                            route: '/customers/functioning-unit-status'
                        }
                    ]
                },
                {
                    id: 'cases',
                    label: 'Cases',
                    icon: 'pi-briefcase',
                    route: '/cases',
                    children: [
                        {
                            id: 'case-details-only',
                            label: 'Case Details Only',
                            icon: 'pi-briefcase',
                            route: '/cases/case-details',
                            children: [
                                {
                                    id: 'banking-arrangement',
                                    label: 'Banking Arrangement',
                                    icon: 'pi-building',
                                    route: '/cases/banking-arrangements'
                                },
                                {
                                    id: 'guarantor',
                                    label: 'Guarantor',
                                    icon: 'pi-users',
                                    route: '/cases/guarantor'
                                },
                                {
                                    id: 'security',
                                    label: 'Security',
                                    icon: 'pi-shield',
                                    route: '/cases/security'
                                },
                                {
                                    id: 'forensic-audit',
                                    label: 'Forensic Audit',
                                    icon: 'pi-search',
                                    route: '/cases/forensic-audit'
                                },
                                {
                                    id: 'look-out-circular',
                                    label: 'Look Out Circular',
                                    icon: 'pi-eye',
                                    route: '/cases/look-out-circular'
                                },
                                {
                                    id: 'sarfaesi-details',
                                    label: 'SARFAESI Details',
                                    icon: 'pi-file',
                                    route: '/cases/sarfaesi-details'
                                },
                                {
                                    id: 'drt-suit',
                                    label: 'DRT & SUIT',
                                    icon: 'pi-briefcase',
                                    route: '/cases/drt-suit'
                                }
                            ]
                        },
                        {
                            id: 'cirp-details',
                            label: 'CIRP Details',
                            icon: 'pi-file-edit',
                            route: '/cases/cirp',
                            children: [
                                {
                                    id: 'admission',
                                    label: 'Admission',
                                    icon: 'pi-pencil',
                                    route: '/cases/cirp/admission',
                                    children: [
                                        {
                                            id: 'application-filing',
                                            label: 'Application Filing',
                                            icon: 'pi-file',
                                            route: '/cases/cirp/admission/filing',
                                            children: [
                                                {
                                                    id: 'application-details',
                                                    label: 'Application Details',
                                                    icon: 'pi-file',
                                                    route: '/cases/cirp/application/details'
                                                },
                                                {
                                                    id: 'applicant-details',
                                                    label: 'Applicant Details',
                                                    icon: 'pi-user-plus',
                                                    route: '/cases/cirp/application/applicant'
                                                },
                                                {
                                                    id: 'documents',
                                                    label: 'Documents',
                                                    icon: 'pi-clock',
                                                    route: '/cases/cirp/application/documents'
                                                }
                                            ]
                                        },
                                        {
                                            id: 'admission-order',
                                            label: 'Admission Order',
                                            icon: 'pi-file-check',
                                            route: '/cases/cirp/admission/order',
                                            children: [
                                                {
                                                    id: 'nclt-order-details',
                                                    label: 'NCLT Order Details',
                                                    icon: 'pi-file',
                                                    route: '/cases/cirp/admission/order/nclt'
                                                },
                                                {
                                                    id: 'irp-appointment',
                                                    label: 'IRP Appointment',
                                                    icon: 'pi-user-plus',
                                                    route: '/cases/cirp/admission/order/irp'
                                                },
                                                {
                                                    id: 'moratorium',
                                                    label: 'Moratorium',
                                                    icon: 'pi-clock',
                                                    route: '/cases/cirp/admission/order/moratorium'
                                                },
                                                {
                                                    id: 'timeline-dashboard',
                                                    label: 'Timeline Dashboard',
                                                    icon: 'pi-chart-line',
                                                    route: '/cases/cirp/admission/order/timeline'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    id: 'claims-coc-position',
                                    label: 'Claims & CoC Position',
                                    icon: 'pi-money-bill',
                                    route: '/cases/cirp/claims',
                                    children: [
                                        {
                                            id: 'bank-baroda-claim',
                                            label: "Bank of Baroda's Claim",
                                            icon: 'pi-building',
                                            route: '/cases/cirp/claims/bank-baroda'
                                        },
                                        {
                                            id: 'coc-formation',
                                            label: 'CoC Formation',
                                            icon: 'pi-users',
                                            route: '/cases/cirp/claims/coc-formation'
                                        },
                                        {
                                            id: 'financial-creditors',
                                            label: 'Financial Creditors',
                                            icon: 'pi-dollar',
                                            route: '/cases/cirp/claims/financial-creditors'
                                        },
                                        {
                                            id: 'operational-creditors',
                                            label: 'Operational Creditors',
                                            icon: 'pi-cog',
                                            route: '/cases/cirp/claims/operational-creditors'
                                        },
                                        {
                                            id: 'other-claims',
                                            label: 'Other Claims',
                                            icon: 'pi-list',
                                            route: '/cases/cirp/claims/other-claims'
                                        },
                                        {
                                            id: 'summary-stats',
                                            label: 'Summary Stats',
                                            icon: 'pi-chart-bar',
                                            route: '/cases/cirp/claims/summary-stats'
                                        }
                                    ]
                                },
                                {
                                    id: 'eoi-resolution-plans',
                                    label: 'EOI & Resolution Plans',
                                    icon: 'pi-file-edit',
                                    route: '/cases/cirp/eoi',
                                    children: [
                                        {
                                            id: 'expression-of-interest',
                                            label: 'Expression of Interest',
                                            icon: 'pi-envelope',
                                            route: '/cases/cirp/eoi/expression'
                                        },
                                        {
                                            id: 'resolution-plans-registry',
                                            label: 'Resolution Plans Registry',
                                            icon: 'pi-book',
                                            route: '/cases/cirp/eoi/registry'
                                        },
                                        {
                                            id: 'comparative-analysis',
                                            label: 'Comparative Analysis',
                                            icon: 'pi-chart-line',
                                            route: '/cases/cirp/eoi/comparative-analysis'
                                        },
                                        {
                                            id: 'bank-internal-assessment',
                                            label: "Bank's Internal Assessment",
                                            icon: 'pi-check-square',
                                            route: '/cases/cirp/eoi/bank-assessment'
                                        },
                                        {
                                            id: 'coc-approval',
                                            label: 'CoC Approval',
                                            icon: 'pi-check',
                                            route: '/cases/cirp/eoi/coc-approval'
                                        },
                                        {
                                            id: 'nclt-final-approval',
                                            label: 'NCLT Final Approval',
                                            icon: 'pi-verified',
                                            route: '/cases/cirp/eoi/nclt-approval'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'hearings',
                            label: 'Hearings',
                            icon: 'pi-calendar',
                            route: '/cases/cirp/hearings'
                        }
                    ]
                }
            ]
        }
    ];

    // Public observables exposing state
    public readonly displayMode$: Observable<'normal' | 'compact'> = this.displayModeSubject.asObservable();
    public readonly positioningMode$: Observable<'relative' | 'overlay'> = this.positioningModeSubject.asObservable();
    public readonly isMainSidebarVisible$: Observable<boolean> = this.isMainSidebarVisibleSubject.asObservable();
    public readonly isSubSidebarOpen$: Observable<boolean> = this.isSubSidebarOpenSubject.asObservable();
    public readonly subSidebarItems$: Observable<MenuItem[]> = this.subSidebarItemsSubject.asObservable();
    public readonly subSidebarTitle$: Observable<string> = this.subSidebarTitleSubject.asObservable();
    public readonly subSidebarParentRoute$: Observable<string | null> = this.subSidebarParentRouteSubject.asObservable();
    public readonly selectedItemId$: Observable<string | null> = this.selectedItemIdSubject.asObservable();
    public readonly selectedItemPath$: Observable<string[]> = this.selectedItemPathSubject.asObservable();
    public readonly activeRoute$: Observable<string | null> = this.activeRouteSubject.asObservable();

    constructor(
        private breakpointObserver: BreakpointObserver,
        private router: Router
    ) {
        this.initializeMenuConfiguration();
        this.initializeViewportDetection();
        this.initializeRouteTracking();
    }

    /**
     * Initializes and validates the menu configuration
     * @private
     */
    private initializeMenuConfiguration(): void {
        try {
            const validatedMenu = this.validateMenuStructure(this.menuConfiguration);
            this.menuSectionsSubject.next(validatedMenu);
        } catch (error) {
            console.error('Failed to initialize menu configuration', error);
            this.menuSectionsSubject.next([]);
        }
    }

    /**
     * Validates the menu structure to ensure data integrity
     * Checks for duplicate IDs, circular references, and required fields
     * @param sections - The menu sections to validate
     * @returns Validated menu sections with invalid items filtered out
     * @private
     */
    private validateMenuStructure(sections: MenuSection[]): MenuSection[] {
        const seenIds = new Set<string>();

        const validateItem = (item: MenuItem, path: string[] = []): boolean => {
            // Check required fields
            if (!item.id || !item.label || !item.icon) {
                console.error('Invalid menu item: missing required fields (id, label, or icon)', item);
                return false;
            }

            // Check for duplicate IDs
            if (seenIds.has(item.id)) {
                console.error('Duplicate menu item ID detected:', item.id);
                return false;
            }

            // Check for circular references
            if (path.includes(item.id)) {
                console.error('Circular reference detected in menu for item:', item.id);
                return false;
            }

            seenIds.add(item.id);

            // Recursively validate children
            if (item.children && item.children.length > 0) {
                item.children = item.children.filter(child =>
                    validateItem(child, [...path, item.id])
                );
            }

            return true;
        };

        return sections.map(section => ({
            ...section,
            items: section.items.filter(item => validateItem(item))
        })).filter(section => section.items.length > 0);
    }

    /**
     * Finds a menu item by its ID using recursive search
     * @param id - The ID of the menu item to find
     * @returns The menu item if found, null otherwise
     */
    public findMenuItemById(id: string): MenuItem | null {
        const searchInItems = (items: MenuItem[]): MenuItem | null => {
            for (const item of items) {
                if (item.id === id) {
                    return item;
                }
                if (item.children && item.children.length > 0) {
                    const found = searchInItems(item.children);
                    if (found) {
                        return found;
                    }
                }
            }
            return null;
        };

        const sections = this.menuSectionsSubject.value;
        for (const section of sections) {
            const found = searchInItems(section.items);
            if (found) {
                return found;
            }
        }
        return null;
    }

    /**
     * Finds a menu item by its route using route matching logic
     * Supports exact route matching and partial matching for nested routes
     * @param route - The route to search for
     * @returns The menu item if found, null otherwise
     */
    public findMenuItemByRoute(route: string): MenuItem | null {
        // Normalize route (remove leading/trailing slashes)
        const normalizedRoute = route.replace(/^\/+|\/+$/g, '');

        const searchInItems = (items: MenuItem[]): MenuItem | null => {
            let bestMatch: MenuItem | null = null;
            let bestMatchLength = 0;

            for (const item of items) {
                if (item.route) {
                    const itemRoute = item.route.replace(/^\/+|\/+$/g, '');

                    // Exact match
                    if (itemRoute === normalizedRoute) {
                        return item;
                    }

                    // Partial match (for nested routes) - find the longest matching route
                    if (normalizedRoute.startsWith(itemRoute) && itemRoute.length > bestMatchLength) {
                        bestMatch = item;
                        bestMatchLength = itemRoute.length;
                    }
                }

                // Recursively search children
                if (item.children && item.children.length > 0) {
                    const found = searchInItems(item.children);
                    if (found) {
                        // If we found an exact match in children, return it
                        if (found.route && found.route.replace(/^\/+|\/+$/g, '') === normalizedRoute) {
                            return found;
                        }
                        // Otherwise, keep it as a candidate if it's better than current best match
                        const foundRoute = found.route?.replace(/^\/+|\/+$/g, '') || '';
                        if (foundRoute.length > bestMatchLength) {
                            bestMatch = found;
                            bestMatchLength = foundRoute.length;
                        }
                    }
                }
            }

            return bestMatch;
        };

        const sections = this.menuSectionsSubject.value;
        for (const section of sections) {
            const found = searchInItems(section.items);
            if (found) {
                return found;
            }
        }
        return null;
    }

    /**
     * Builds the hierarchy path from root to the specified menu item
     * Returns an array of item IDs representing the path
     * @param itemId - The ID of the target menu item
     * @returns Array of item IDs from root to target, empty array if not found
     */
    public getMenuItemPath(itemId: string): string[] {
        const buildPath = (items: MenuItem[], targetId: string, currentPath: string[] = []): string[] | null => {
            for (const item of items) {
                const newPath = [...currentPath, item.id];

                if (item.id === targetId) {
                    return newPath;
                }

                if (item.children && item.children.length > 0) {
                    const found = buildPath(item.children, targetId, newPath);
                    if (found) {
                        return found;
                    }
                }
            }
            return null;
        };

        const sections = this.menuSectionsSubject.value;
        for (const section of sections) {
            const path = buildPath(section.items, itemId);
            if (path) {
                return path;
            }
        }
        return [];
    }

    /**
     * Gets the current menu sections
     * @returns The current menu sections
     */
    public getMenuSections(): MenuSection[] {
        return this.menuSectionsSubject.value;
    }

    /**
     * Gets the current complete navigation state
     */
    public getState(): NavigationState {
        return {
            displayMode: this.displayModeSubject.value,
            positioningMode: this.positioningModeSubject.value,
            isMainSidebarVisible: this.isMainSidebarVisibleSubject.value,
            isSubSidebarOpen: this.isSubSidebarOpenSubject.value,
            subSidebarItems: this.subSidebarItemsSubject.value,
            subSidebarTitle: this.subSidebarTitleSubject.value,
            subSidebarParentRoute: this.subSidebarParentRouteSubject.value,
            selectedItemId: this.selectedItemIdSubject.value,
            selectedItemPath: this.selectedItemPathSubject.value,
            activeRoute: this.activeRouteSubject.value,
            previousDisplayMode: this.previousDisplayModeSubject.value,
        };
    }

    /**
     * Toggles between normal and compact display modes
     */
    public toggleDisplayMode(): void {
        const currentMode = this.displayModeSubject.value;
        const newMode = currentMode === 'normal' ? 'compact' : 'normal';
        this.setDisplayMode(newMode);
    }

    /**
     * Sets the display mode to the specified value
     * @param mode - The display mode to set ('normal' or 'compact')
     */
    public setDisplayMode(mode: 'normal' | 'compact'): void {
        this.displayModeSubject.next(mode);
    }

    /**
     * Toggles the main sidebar visibility (used in overlay mode)
     */
    public toggleMainSidebarVisibility(): void {
        const currentVisibility = this.isMainSidebarVisibleSubject.value;
        this.isMainSidebarVisibleSubject.next(!currentVisibility);
    }

    /**
     * Shows the main sidebar
     */
    public showMainSidebar(): void {
        this.isMainSidebarVisibleSubject.next(true);
    }

    /**
     * Hides the main sidebar
     */
    public hideMainSidebar(): void {
        this.isMainSidebarVisibleSubject.next(false);
    }

    /**
     * Gets the current display mode value
     */
    public getDisplayMode(): 'normal' | 'compact' {
        return this.displayModeSubject.value;
    }

    /**
     * Gets the current positioning mode value
     */
    public getPositioningMode(): 'relative' | 'overlay' {
        return this.positioningModeSubject.value;
    }

    /**
     * Gets the current main sidebar visibility state
     */
    public isMainSidebarVisible(): boolean {
        return this.isMainSidebarVisibleSubject.value;
    }

    /**
     * Gets the current sub-sidebar open state
     */
    public isSubSidebarOpen(): boolean {
        return this.isSubSidebarOpenSubject.value;
    }

    /**
     * Gets the currently selected item ID
     */
    public getSelectedItemId(): string | null {
        return this.selectedItemIdSubject.value;
    }

    /**
     * Gets the current active route
     */
    public getActiveRoute(): string | null {
        return this.activeRouteSubject.value;
    }

    /**
     * Gets the current sub-sidebar parent route
     */
    public getSubSidebarParentRoute(): string | null {
        return this.subSidebarParentRouteSubject.value;
    }

    /**
     * Initializes viewport detection and sets up breakpoint observation
     * Automatically switches positioning mode based on viewport size
     * @private
     */
    private initializeViewportDetection(): void {
        try {
            this.breakpointObserver
                .observe([this.MOBILE_BREAKPOINT])
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: (result) => {
                        this.handleViewportChange(result.matches);
                    },
                    error: (error) => {
                        console.warn('Breakpoint observation failed, defaulting to relative mode', error);
                        this.setPositioningMode('relative');
                    }
                });
        } catch (error) {
            console.warn('Failed to initialize viewport detection, defaulting to relative mode', error);
            this.setPositioningMode('relative');
        }
    }

    /**
     * Handles viewport size changes and updates positioning mode accordingly
     * Preserves state during transitions between mobile and desktop
     * @param isMobile - Whether the viewport is in mobile size (≤768px)
     * @private
     */
    private handleViewportChange(isMobile: boolean): void {
        const currentPositioningMode = this.positioningModeSubject.value;
        const newPositioningMode: 'relative' | 'overlay' = isMobile ? 'overlay' : 'relative';

        // Only update if the mode actually changed
        if (currentPositioningMode !== newPositioningMode) {
            this.setPositioningMode(newPositioningMode);
            this.handlePositioningModeTransition(newPositioningMode);
        }
    }

    /**
     * Sets the positioning mode to the specified value
     * @param mode - The positioning mode to set ('relative' or 'overlay')
     * @private
     */
    private setPositioningMode(mode: 'relative' | 'overlay'): void {
        this.positioningModeSubject.next(mode);
    }

    /**
     * Handles state preservation and adjustments during positioning mode transitions
     * Ensures smooth transitions between relative and overlay modes
     * @param toMode - The new positioning mode
     * @private
     */
    private handlePositioningModeTransition(toMode: 'relative' | 'overlay'): void {
        // When transitioning to overlay mode (mobile)
        if (toMode === 'overlay') {
            // In overlay mode, sidebar should be hidden by default
            this.hideMainSidebar();

            // If sub-sidebar is open, ensure main sidebar is in compact mode
            if (this.isSubSidebarOpenSubject.value) {
                this.setDisplayMode('compact');
            } else {
                // Default to normal mode in overlay when sub-sidebar is closed
                this.setDisplayMode('normal');
            }
        }

        // When transitioning to relative mode (desktop)
        if (toMode === 'relative') {
            // In relative mode, sidebar should be visible
            this.showMainSidebar();

            // Restore previous display mode if available, otherwise default to normal
            const previousMode = this.previousDisplayModeSubject.value;
            if (previousMode && !this.isSubSidebarOpenSubject.value) {
                this.setDisplayMode(previousMode);
            } else if (this.isSubSidebarOpenSubject.value) {
                // Keep compact mode if sub-sidebar is open
                this.setDisplayMode('compact');
            } else {
                this.setDisplayMode('normal');
            }
        }
    }

    /**
     * Initializes route tracking to automatically select menu items based on current route
     * Subscribes to NavigationEnd events and updates selection accordingly
     * @private
     */
    private initializeRouteTracking(): void {
        // Subscribe to router navigation events
        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                takeUntil(this.destroy$)
            )
            .subscribe({
                next: (event: NavigationEnd) => {
                    this.handleRouteChange(event.urlAfterRedirects || event.url);
                },
                error: (error) => {
                    console.error('Route tracking error:', error);
                }
            });

        // Handle initial route on service initialization
        const currentUrl = this.router.url;
        if (currentUrl) {
            this.handleRouteChange(currentUrl);
        }
    }

    /**
     * Handles route changes by finding and selecting the corresponding menu item
     * Opens sub-sidebar only for nested routes (routes with depth > 1)
     * @param url - The current route URL
     * @private
     */
    private handleRouteChange(url: string): void {
        // Update active route
        this.activeRouteSubject.next(url);

        // Find the menu item that matches this route
        const menuItem = this.findMenuItemByRoute(url);

        if (menuItem) {
            // Select the menu item
            this.selectMenuItem(menuItem.id);

            // Get the full path to this item (including all parent IDs)
            const itemPath = this.getMenuItemPath(menuItem.id);
            this.selectedItemPathSubject.next(itemPath);

            // Only open sub-sidebar if this is a nested route (depth > 1)
            // For example: /customers/basic-details should open sub-sidebar
            // But /customers should NOT open sub-sidebar
            if (itemPath.length > 1) {
                // This is a nested item, open sub-sidebar with parent's children
                const parentId = itemPath[0]; // First item in path is the top-level parent
                const parentItem = this.findMenuItemById(parentId);

                if (parentItem && parentItem.children && parentItem.children.length > 0) {
                    this.openSubSidebar(parentItem.children, parentItem.label, parentItem.route);
                }
            } else {
                // Top-level route - close sub-sidebar if open
                if (this.isSubSidebarOpenSubject.value) {
                    this.closeSubSidebar();
                }
            }
        } else {
            // No matching menu item found for this route
            // Clear selection and close sub-sidebar
            this.selectedItemIdSubject.next(null);
            this.selectedItemPathSubject.next([]);

            if (this.isSubSidebarOpenSubject.value) {
                this.closeSubSidebar();
            }
        }
    }

    /**
     * Selects a menu item by its ID
     * Updates the selected item state
     * @param itemId - The ID of the menu item to select
     */
    public selectMenuItem(itemId: string): void {
        this.selectedItemIdSubject.next(itemId);
    }

    /**
     * Opens the sub-sidebar with the specified items and title
     * Automatically switches main sidebar to compact mode
     * @param items - The menu items to display in the sub-sidebar
     * @param title - The title to display in the sub-sidebar header
     * @param parentRoute - Optional parent route to navigate back to when closing sub-sidebar
     */
    public openSubSidebar(items: MenuItem[], title: string, parentRoute?: string): void {
        // Only store previous display mode if sub-sidebar is not already open
        if (!this.isSubSidebarOpenSubject.value) {
            const currentDisplayMode = this.displayModeSubject.value;
            this.previousDisplayModeSubject.next(currentDisplayMode);
        }

        // Set sub-sidebar state
        this.subSidebarItemsSubject.next(items);
        this.subSidebarTitleSubject.next(title);
        this.subSidebarParentRouteSubject.next(parentRoute || null);
        this.isSubSidebarOpenSubject.next(true);

        // Switch main sidebar to compact mode
        this.setDisplayMode('compact');

        // In overlay mode, ensure main sidebar is visible when sub-sidebar opens
        if (this.positioningModeSubject.value === 'overlay') {
            this.showMainSidebar();
        }
    }

    /**
     * Closes the sub-sidebar and restores the previous display mode
     * Navigates to the parent route if available
     */
    public closeSubSidebar(): void {
        // Navigate to parent route if available
        const parentRoute = this.subSidebarParentRouteSubject.value;
        if (parentRoute) {
            this.router.navigate([parentRoute]);
        }

        this.isSubSidebarOpenSubject.next(false);
        this.subSidebarItemsSubject.next([]);
        this.subSidebarTitleSubject.next('');
        this.subSidebarParentRouteSubject.next(null);

        // Restore previous display mode
        const previousMode = this.previousDisplayModeSubject.value;
        if (previousMode) {
            this.setDisplayMode(previousMode);
            this.previousDisplayModeSubject.next(null);
        } else {
            // Default to normal mode if no previous mode stored
            this.setDisplayMode('normal');
        }
    }

    /**
     * Navigates to a menu item
     * Simply navigates to the route if available
     * Route tracking will handle sub-sidebar opening automatically
     * @param item - The menu item to navigate to
     */
    public navigateToItem(item: MenuItem): void {
        if (item.disabled) {
            return;
        }

        // Execute custom command if provided
        if (item.command) {
            item.command();
        }

        // Navigate to route if available
        if (item.route) {
            this.router.navigate([item.route]).catch(error => {
                console.error('Navigation failed for route:', item.route, error);
            });

            // In overlay mode, hide the main sidebar after navigation
            if (this.positioningModeSubject.value === 'overlay') {
                this.hideMainSidebar();
            }
        }
    }

    /**
     * Cleanup method called when the service is destroyed
     * Completes all subscriptions to prevent memory leaks
     */
    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
