import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SidebarService, MenuItem } from '../../services/sidebar.service';
import { SidebarItemComponent } from '../sidebar/sidebar-item/sidebar-item';

@Component({
    selector: 'app-sub-sidebar',
    standalone: true,
    imports: [CommonModule, ButtonModule, SidebarItemComponent],
    templateUrl: './sub-sidebar.html',
    styleUrl: './sub-sidebar.scss',
})
export class SubSidebarComponent implements OnInit, OnDestroy {
    subMenuItems: MenuItem[] = [];
    currentSection: string = '';
    private destroy$ = new Subject<void>();

    // Expansion state management
    private expansionState = new Map<string, boolean>();
    readonly maxNestingLevel: number = 5;

    constructor(
        public sidebarService: SidebarService,
        private router: Router
    ) { }

    ngOnInit(): void {
        // Subscribe to sub-menu items from service
        this.sidebarService.subMenuItems$
            .pipe(takeUntil(this.destroy$))
            .subscribe(items => {
                this.subMenuItems = items;
            });

        // Subscribe to sub-sidebar title from service
        this.sidebarService.subSidebarTitle$
            .pipe(takeUntil(this.destroy$))
            .subscribe(title => {
                this.currentSection = title;
            });

        // Subscribe to sub-sidebar open state to reset expansion state on close
        this.sidebarService.isSubSidebarOpen$
            .pipe(takeUntil(this.destroy$))
            .subscribe(isOpen => {
                if (!isOpen) {
                    // Clear expansion state when sub-sidebar closes
                    this.expansionState.clear();
                }
            });
    }

    onSubItemClick(item: MenuItem, level: number): void {
        // Differentiate between expandable and leaf items
        if (this.hasChildren(item)) {
            // Expandable item click behavior
            this.toggleExpansion(item.id);

            // Trigger sibling collapse at the same level
            const siblings = this.findSiblings(item.id, this.subMenuItems, 1);
            this.collapseAllAtLevel(siblings, level, item.id);

            // Prevent navigation for expandable items
            return;
        }

        // Leaf item click behavior
        // Set selected item in service
        this.sidebarService.setSelectedItem(item.id);

        // Set active route state to show content header
        this.sidebarService.setHasActiveRoute(true);

        // Navigate to route if defined
        if (item.route) {
            this.router.navigate([item.route]);
        }

        // Execute command if defined
        if (item.command) {
            item.command();
        }

        // Expansion states are maintained (no changes to expansionState Map)
    }

    /**
     * Check if a menu item is currently expanded
     * @param itemId - The ID of the menu item to check
     * @returns true if the item is expanded, false otherwise
     */
    isExpanded(itemId: string): boolean {
        return this.expansionState.get(itemId) ?? false;
    }

    /**
     * Toggle the expansion state of a menu item
     * @param itemId - The ID of the menu item to toggle
     */
    toggleExpansion(itemId: string): void {
        const currentState = this.isExpanded(itemId);
        this.expansionState.set(itemId, !currentState);
    }

    /**
     * Collapse all menu items at a specific level except for an optional exception
     * @param items - Array of menu items to process
     * @param level - Current nesting level
     * @param exceptId - Optional ID of item to exclude from collapsing
     */
    private collapseAllAtLevel(items: MenuItem[], level: number, exceptId?: string): void {
        items.forEach(item => {
            if (item.id !== exceptId && this.expansionState.get(item.id)) {
                this.expansionState.set(item.id, false);

                // Recursively collapse all children
                if (item.children && item.children.length > 0) {
                    this.collapseAllChildren(item.children);
                }
            }
        });
    }

    /**
     * Recursively collapse all descendant items
     * @param items - Array of menu items to collapse
     */
    private collapseAllChildren(items: MenuItem[]): void {
        items.forEach(item => {
            this.expansionState.set(item.id, false);
            if (item.children && item.children.length > 0) {
                this.collapseAllChildren(item.children);
            }
        });
    }

    /**
     * Find sibling items at the same level in the menu tree
     * @param targetId - ID of the item whose siblings to find
     * @param items - Root menu items array
     * @param currentLevel - Current nesting level (default: 1)
     * @returns Array of sibling items or empty array if not found
     */
    private findSiblings(targetId: string, items: MenuItem[], currentLevel: number = 1): MenuItem[] {
        // Check if target is at current level
        for (const item of items) {
            if (item.id === targetId) {
                // Found the target at this level, return all items at this level
                return items;
            }
        }

        // Search in children
        for (const item of items) {
            if (item.children && item.children.length > 0) {
                const siblings = this.findSiblings(targetId, item.children, currentLevel + 1);
                if (siblings.length > 0) {
                    return siblings;
                }
            }
        }

        return [];
    }

    /**
     * Check if a menu item has children
     * @param item - The menu item to check
     * @returns true if the item has children, false otherwise
     */
    hasChildren(item: MenuItem): boolean {
        return item.children !== undefined && item.children.length > 0;
    }

    /**
     * Recursively calculate the nesting level of a menu item
     * @param targetId - The ID of the item to find
     * @param items - Array of menu items to search
     * @param currentLevel - Current nesting level (default: 1)
     * @returns The nesting level (1, 2, or 3) or 0 if not found
     */
    getItemLevel(targetId: string, items: MenuItem[] = this.subMenuItems, currentLevel: number = 1): number {
        // Check if target is at current level
        for (const item of items) {
            if (item.id === targetId) {
                return currentLevel;
            }
        }

        // Search in children
        for (const item of items) {
            if (item.children && item.children.length > 0) {
                const level = this.getItemLevel(targetId, item.children, currentLevel + 1);
                if (level > 0) {
                    return level;
                }
            }
        }

        return 0; // Not found
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
