import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { NavigationService } from '../../services/navigation.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, ButtonModule],
    templateUrl: './app-header.component.html',
    styleUrl: './app-header.component.scss',
})
export class AppHeaderComponent implements OnInit, OnDestroy {
    positioningMode: 'relative' | 'overlay' = 'relative';
    private destroy$ = new Subject<void>();

    constructor(public navigationService: NavigationService) { }

    ngOnInit(): void {
        // Subscribe to positioning mode to show/hide hamburger button
        this.navigationService.positioningMode$
            .pipe(takeUntil(this.destroy$))
            .subscribe((mode) => (this.positioningMode = mode));
    }

    onHamburgerClick(event: Event): void {
        // Stop event propagation to prevent any parent click handlers
        event.stopPropagation();
        this.navigationService.toggleMainSidebarVisibility();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
