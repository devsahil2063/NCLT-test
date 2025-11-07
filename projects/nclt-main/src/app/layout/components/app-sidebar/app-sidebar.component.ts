import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { TooltipModule } from 'primeng/tooltip';

// Services
import { NavigationService, MenuSection, MenuItem } from '../../services/navigation.service';
import { ThemeService } from '../../services/theme.service';

// Components
import { SidebarMenuItemComponent } from '../sidebar-menu-item/sidebar-menu-item.component';

/**
 * Main Sidebar Component
 * Displays the primary navigation sidebar with top-level menu items
 * Supports normal/compact display modes and relative/overlay positioning modes
 */
@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        AvatarModule,
        TooltipModule,
        SidebarMenuItemComponent
    ],
    templateUrl: './app-sidebar.component.html',
    styleUrl: './app-sidebar.component.scss'
})
export class AppSidebarComponent implements OnInit, OnDestroy {
    // Component state properties
    displayMode: 'normal' | 'compact' = 'normal';
    positioningMode: 'relative' | 'overlay' = 'relative';
    isVisible = true;
    menuSections: MenuSection[] = [];
    selectedItemId: string | null = null;

    // Empty set for expanded items (main sidebar doesn't track expansion)
    expandedItems = new Set<string>();

    // ViewChild for focus management
    @ViewChild('sidebarNav', { read: ElementRef }) sidebarNav?: ElementRef;

    // Cleanup subject
    private destroy$ = new Subject<void>();

    constructor(
        private navigationService: NavigationService,
        private themeService: ThemeService,
        private elementRef: ElementRef
    ) { }

    ngOnInit(): void {
        // Subscribe to navigation state
        this.navigationService.displayMode$
            .pipe(takeUntil(this.destroy$))
            .subscribe(mode => this.displayMode = mode);

        this.navigationService.positioningMode$
            .pipe(takeUntil(this.destroy$))
            .subscribe(mode => this.positioningMode = mode);

        this.navigationService.isMainSidebarVisible$
            .pipe(takeUntil(this.destroy$))
            .subscribe(visible => {
                this.isVisible = visible;
                // Implement focus management for overlay mode opening
                if (visible && this.positioningMode === 'overlay') {
                    this.focusFirstMenuItem();
                }
            });

        this.navigationService.menuSections$
            .pipe(takeUntil(this.destroy$))
            .subscribe(sections => this.menuSections = sections);

        this.navigationService.selectedItemId$
            .pipe(takeUntil(this.destroy$))
            .subscribe(id => this.selectedItemId = id);
    }

    /**
     * Focuses the first menu item when sidebar opens in overlay mode
     * Improves keyboard navigation accessibility
     */
    private focusFirstMenuItem(): void {
        // Use setTimeout to ensure DOM is updated
        setTimeout(() => {
            const firstButton = this.elementRef.nativeElement.querySelector('.sidebar-item__button');
            if (firstButton) {
                firstButton.focus();
            }
        }, 100);
    }

    /**
     * Toggles between normal and compact display modes
     */
    toggleMode(): void {
        this.navigationService.toggleDisplayMode();
    }

    /**
     * Handles menu item click events
     * @param item - The clicked menu item
     */
    onItemClick(item: MenuItem): void {
        this.navigationService.navigateToItem(item);
    }

    /**
     * Checks if a menu item is currently selected
     * @param itemId - The ID of the menu item to check
     * @returns True if the item is selected, false otherwise
     */
    isItemSelected(itemId: string): boolean {
        return this.selectedItemId === itemId;
    }

    /**
     * Handles user profile click
     * Placeholder for future implementation
     */
    onUserClick(): void {
        // TODO: Implement user profile navigation or menu
        console.log('User profile clicked');
    }

    /**
     * Handles backdrop click in overlay mode
     * Closes both main sidebar and sub-sidebar when clicking on the backdrop
     */
    onBackdropClick(): void {
        // Close sub-sidebar if open (without navigating back)
        if (this.navigationService.isSubSidebarOpen()) {
            this.navigationService.closeSubSidebar(false);
        }
        // Hide main sidebar
        this.navigationService.hideMainSidebar();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
