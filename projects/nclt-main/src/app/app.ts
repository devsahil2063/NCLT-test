import { Component, HostListener, OnDestroy, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { PrimeNG } from 'primeng/config';
import { CommonModule } from '@angular/common';
import { combineLatest, filter, map, Observable, startWith } from 'rxjs';

// New sidebar components
import { AppSidebarComponent } from './layout/components/app-sidebar/app-sidebar.component';
import { AppSubSidebarComponent } from './layout/components/app-sub-sidebar/app-sub-sidebar.component';
import { AppHeaderComponent } from './layout/components/app-header/app-header.component';
import { NavigationService } from './layout/services/navigation.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ButtonModule,
    TooltipModule,
    CommonModule,
    AppSidebarComponent,
    AppSubSidebarComponent,
    AppHeaderComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('nclt-main');

  // Observable to check if warning banner should be shown
  showWarningBanner$!: Observable<boolean>;

  // Observable to check if customer header should be shown
  showCustomerHeader$!: Observable<boolean>;

  constructor(
    private primeng: PrimeNG,
    private router: Router,
    public navigationService: NavigationService,
  ) {
    // Initialize observables in constructor after dependencies are injected
    const casesRouteCheck$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url.includes('cases')),
      startWith(this.router.url.includes('cases')),
    );

    // Show customer header when sub-sidebar is open and on cases route
    this.showCustomerHeader$ = combineLatest([
      this.navigationService.isSubSidebarOpen$,
      casesRouteCheck$,
    ]).pipe(map(([isSubSidebarOpen, isCasesRoute]) => isSubSidebarOpen && isCasesRoute));

    // Show warning banner when sub-sidebar is open and on cases route
    this.showWarningBanner$ = this.showCustomerHeader$;
  }

  ngOnInit() {
    this.primeng.ripple.set(true);
  }

  ngOnDestroy() {
    // Cleanup handled by component lifecycle
  }

  /**
   * Handles keyboard events for accessibility
   * Escape key closes sub-sidebar or main sidebar in overlay mode
   */
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      // Get current state synchronously
      combineLatest([
        this.navigationService.isSubSidebarOpen$,
        this.navigationService.isMainSidebarVisible$,
        this.navigationService.positioningMode$,
      ])
        .pipe(
          map(([isSubSidebarOpen, isMainSidebarVisible, positioningMode]) => {
            // Close sub-sidebar first if it's open
            if (isSubSidebarOpen) {
              this.navigationService.closeSubSidebar();
              event.preventDefault();
              return;
            }

            // Close main sidebar if in overlay mode and visible
            if (positioningMode === 'overlay' && isMainSidebarVisible) {
              this.navigationService.hideMainSidebar();
              event.preventDefault();
              return;
            }
          }),
        )
        .subscribe()
        .unsubscribe();
    }
  }

  toggleDarkMode() {
    const element = document.querySelector('html');
    element?.classList.toggle('my-app-dark');
  }
}
