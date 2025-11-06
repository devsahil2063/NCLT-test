import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NavigationService, MenuItem } from '../../services/navigation.service';
import { SubSidebarMenuItemComponent } from '../sub-sidebar-menu-item/sub-sidebar-menu-item.component';
import { Router } from '@angular/router';

/**
 * Sub-sidebar component for displaying nested menu items
 * Appears to the right of the main sidebar when a parent menu item is selected
 * Supports multiple levels of nesting with expand/collapse functionality
 */
@Component({
    selector: 'app-sub-sidebar',
    standalone: true,
    imports: [CommonModule, ButtonModule, SubSidebarMenuItemComponent],
    templateUrl: './app-sub-sidebar.component.html',
    styleUrl: './app-sub-sidebar.component.scss',
})
export class AppSubSidebarComponent implements OnInit, OnDestroy {
    /**
     * Whether the sub-sidebar is currently open
     */
    isOpen = false;

    /**
     * Menu items to display in the sub-sidebar
     */
    items: MenuItem[] = [];

    /**
     * Title to display in the sub-sidebar header
     */
    title = '';

    /**
     * Current positioning mode (relative or overlay)
     */
    positioningMode: 'relative' | 'overlay' = 'relative';

    /**
     * Currently selected menu item ID
     */
    selectedItemId: string | null = null;

    /**
     * Set to track which items are currently expanded
     * Used for managing nested item visibility
     */
    expandedItems = new Set<string>();

    /**
     * Subject for cleanup on component destruction
     */
    private destroy$ = new Subject<void>();

    constructor(
        private navigationService: NavigationService,
        private elementRef: ElementRef,
        private router: Router
    ) { }

    ngOnInit(): void {
        // Subscribe to sub-sidebar open state
        this.navigationService.isSubSidebarOpen$
            .pipe(takeUntil(this.destroy$))
            .subscribe((open) => {
                this.isOpen = open;
                // Clear expanded items when sub-sidebar closes
                if (!open) {
                    this.expandedItems.clear();
                } else {
                    // Focus first menu item when sub-sidebar opens
                    this.focusFirstMenuItem();
                }
            });

        // Subscribe to sub-sidebar items
        this.navigationService.subSidebarItems$
            .pipe(takeUntil(this.destroy$))
            .subscribe((items) => {
                this.items = items;
            });

        // Subscribe to sub-sidebar title
        this.navigationService.subSidebarTitle$
            .pipe(takeUntil(this.destroy$))
            .subscribe((title) => {
                this.title = title;
            });

        // Subscribe to positioning mode
        this.navigationService.positioningMode$
            .pipe(takeUntil(this.destroy$))
            .subscribe((mode) => {
                this.positioningMode = mode;
            });

        // Subscribe to selected item ID
        this.navigationService.selectedItemId$
            .pipe(takeUntil(this.destroy$))
            .subscribe((id) => {
                this.selectedItemId = id;
            });
    }

    /**
     * Handles back button click
     * Closes the sub-sidebar and navigates to parent route
     */
    onBackClick(): void {
        this.navigationService.closeSubSidebar();
    }

    /**
     * Handles menu item click
     * For items with children: toggles expansion
     * For leaf items: navigates to the route
     */
    onItemClick(item: MenuItem): void {
        if (item.children && item.children.length > 0) {
            // Item has children - toggle expansion
            this.toggleExpanded(item.id);
        } else {
            // Leaf item - navigate
            this.navigationService.navigateToItem(item);
        }
    }

    /**
     * Checks if a menu item is currently selected
     */
    isItemSelected(itemId: string): boolean {
        return this.selectedItemId === itemId;
    }

    /**
     * Checks if a menu item is currently expanded
     */
    isItemExpanded(itemId: string): boolean {
        return this.expandedItems.has(itemId);
    }

    /**
     * Toggles the expanded state of a menu item
     * Manages the expandedItems Set
     */
    toggleExpanded(itemId: string): void {
        if (this.expandedItems.has(itemId)) {
            this.expandedItems.delete(itemId);
        } else {
            this.expandedItems.add(itemId);
        }
    }

    /**
     * Focuses the first menu item when sub-sidebar opens
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

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
