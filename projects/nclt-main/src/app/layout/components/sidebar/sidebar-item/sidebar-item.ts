import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { MenuItem } from '../../../services/sidebar.service';

@Component({
    selector: 'app-sidebar-item',
    standalone: true,
    imports: [CommonModule, Ripple, TooltipModule],
    templateUrl: './sidebar-item.html',
    styleUrl: './sidebar-item.scss',
})
export class SidebarItemComponent {
    @Input() item!: MenuItem;
    @Input() isCompact: boolean = false;
    @Input() isSelected: boolean = false;
    @Input() isExpanded: boolean = false;
    @Input() nestingLevel: number = 1;
    @Output() itemClick = new EventEmitter<MenuItem>();

    onItemClick(): void {
        this.itemClick.emit(this.item);
    }

    /**
     * Calculate scale factor based on nesting level
     * Level 1: 100%, Level 2: 90%, Level 3: 85%
     */
    getScaleFactor(): number {
        if (this.nestingLevel === 1) return 0.95;
        if (this.nestingLevel === 2) return 0.90;
        if (this.nestingLevel === 3) return 0.85;
        return 0.85;
    }
}
