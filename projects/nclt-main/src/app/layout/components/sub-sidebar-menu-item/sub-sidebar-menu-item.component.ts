import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
import { trigger, transition, style, animate } from '@angular/animations';
import { MenuItem } from '../../services/navigation.service';

/**
 * Menu item component specifically for sub-sidebar
 * Features rounded border selection style
 * Supports recursive rendering for nested menu items
 */
@Component({
    selector: 'app-sub-sidebar-menu-item',
    standalone: true,
    imports: [CommonModule, TooltipModule, RippleModule],
    templateUrl: './sub-sidebar-menu-item.component.html',
    styleUrl: './sub-sidebar-menu-item.component.scss',
    animations: [
        trigger('expandCollapse', [
            transition(':enter', [
                style({ height: 0, overflow: 'hidden' }),
                animate('200ms ease-out', style({ height: '*' })),
            ]),
            transition(':leave', [
                animate('200ms ease-in', style({ height: 0, overflow: 'hidden' }))
            ]),
        ]),
    ],
})
export class SubSidebarMenuItemComponent {
    /**
     * The menu item to display
     */
    @Input() item!: MenuItem;

    /**
     * Whether this menu item is currently selected
     */
    @Input() isSelected = false;

    /**
     * Whether this menu item is expanded (for items with children)
     */
    @Input() isExpanded = false;

    /**
     * The nesting level of this item (1 for top-level, 2 for nested, etc.)
     */
    @Input() nestingLevel = 1;

    /**
     * The ID of the currently selected menu item
     * Used to determine if nested children should be marked as selected
     */
    @Input() selectedItemId: string | null = null;

    /**
     * Set of IDs for expanded menu items
     * Used to determine if nested children should be shown as expanded
     */
    @Input() expandedItemIds: Set<string> = new Set<string>();

    /**
     * Event emitted when the menu item is clicked
     */
    @Output() itemClick = new EventEmitter<MenuItem>();

    /**
     * Returns true if this item has children
     */
    get hasChildren(): boolean {
        return !!this.item.children && this.item.children.length > 0;
    }

    /**
     * Handles click on this menu item
     */
    onClick(): void {
        if (!this.item.disabled) {
            this.itemClick.emit(this.item);
        }
    }

    /**
     * Handles click on a child menu item
     * Propagates the event up to the parent
     */
    onChildClick(child: MenuItem): void {
        this.itemClick.emit(child);
    }

    /**
     * Checks if a child menu item is currently selected
     */
    isChildSelected(childId: string): boolean {
        return this.selectedItemId === childId;
    }

    /**
     * Checks if a child menu item is currently expanded
     */
    isChildExpanded(childId: string): boolean {
        return this.expandedItemIds.has(childId);
    }
}
