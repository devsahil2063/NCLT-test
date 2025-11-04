import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { TooltipModule } from 'primeng/tooltip';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SidebarService, MenuItem, MenuSection, SidebarMode } from '../../services/sidebar.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, ButtonModule, Ripple, AvatarModule, TooltipModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnInit, OnDestroy {
  menuSections: MenuSection[] = [];
  private destroy$ = new Subject<void>();

  // Expose SidebarMode enum to template
  readonly SidebarMode = SidebarMode;

  constructor(
    public sidebarService: SidebarService,
    private themeService: ThemeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeMenuSections();
    this.setupRouteTracking();
  }

  /**
   * Setup route tracking to update selected state based on current route
   */
  private setupRouteTracking(): void {
    // Set initial selected item based on current route
    this.updateSelectedItemFromRoute(this.router.url);

    // Listen to route changes
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        this.updateSelectedItemFromRoute(event.urlAfterRedirects);
      });
  }

  /**
   * Update selected item based on current route
   */
  private updateSelectedItemFromRoute(url: string): void {
    // Find the menu item that matches the current route
    const matchingItem = this.findItemByRoute(url);
    if (matchingItem) {
      this.sidebarService.setSelectedItem(matchingItem.id);
    }
  }

  /**
   * Recursively find menu item by route
   */
  private findItemByRoute(route: string): MenuItem | null {
    for (const section of this.menuSections) {
      for (const item of section.items) {
        const found = this.searchItemByRoute(item, route);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }

  /**
   * Recursively search for item by route
   */
  private searchItemByRoute(item: MenuItem, route: string): MenuItem | null {
    if (item.route && route.startsWith(item.route)) {
      return item;
    }
    if (item.children) {
      for (const child of item.children) {
        const found = this.searchItemByRoute(child, route);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }

  initializeMenuSections(): void {
    this.menuSections = [
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
                route: '/customers/basic-details',
              },
              {
                id: 'facility-details',
                label: 'Facility Details',
                icon: 'pi-building',
                route: '/customers/facility-details',
              },
              {
                id: 'other-parties',
                label: 'Other Parties',
                icon: 'pi-users',
                route: '/customers/other-parties',
              },
              {
                id: 'security-details',
                label: 'Security Details',
                icon: 'pi-shield',
                route: '/customers/security-details',
              },
              {
                id: 'functioning-unit-status',
                label: 'Functioning Unit Status',
                icon: 'pi-check-circle',
                route: '/customers/functioning-unit-status',
              },
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
                    route: '/cases/banking-arrangement',
                  },
                  {
                    id: 'guarantor',
                    label: 'Guarantor',
                    icon: 'pi-users',
                    route: '/cases/guarantor',
                  },
                  {
                    id: 'security',
                    label: 'Security',
                    icon: 'pi-shield',
                    route: '/cases/security',
                  },
                  {
                    id: 'forensic-audit',
                    label: 'Forensic Audit',
                    icon: 'pi-search',
                    route: '/cases/forensic-audit',
                  },
                  {
                    id: 'look-out-circular',
                    label: 'Look Out Circular',
                    icon: 'pi-eye',
                    route: '/cases/look-out-circular',
                  },
                  {
                    id: 'sarfaesi-details',
                    label: 'SARFAESI Details',
                    icon: 'pi-file',
                    route: '/cases/sarfaesi-details',
                  },
                  {
                    id: 'drt-suit',
                    label: 'DRT & SUIT',
                    icon: 'pi-briefcase',
                    route: '/cases/drt-suit',
                  },
                ],
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
                            route: '/cases/cirp/admission/order/nclt',
                          },
                          {
                            id: 'irp-appointment',
                            label: 'IRP Appointment',
                            icon: 'pi-user-plus',
                            route: '/cases/cirp/admission/order/irp',
                          },
                          {
                            id: 'moratorium',
                            label: 'Moratorium',
                            icon: 'pi-clock',
                            route: '/cases/cirp/admission/order/moratorium',
                          },
                          {
                            id: 'timeline-dashboard',
                            label: 'Timeline Dashboard',
                            icon: 'pi-chart-line',
                            route: '/cases/cirp/admission/order/timeline',
                          },
                        ],
                      },
                    ],
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
                        route: '/cases/cirp/claims/bank-baroda',
                      },
                      {
                        id: 'coc-formation',
                        label: 'CoC Formation',
                        icon: 'pi-users',
                        route: '/cases/cirp/claims/coc-formation',
                      },
                      {
                        id: 'financial-creditors',
                        label: 'Financial Creditors',
                        icon: 'pi-dollar',
                        route: '/cases/cirp/claims/financial-creditors',
                      },
                      {
                        id: 'operational-creditors',
                        label: 'Operational Creditors',
                        icon: 'pi-cog',
                        route: '/cases/cirp/claims/operational-creditors',
                      },
                      {
                        id: 'other-claims',
                        label: 'Other Claims',
                        icon: 'pi-list',
                        route: '/cases/cirp/claims/other-claims',
                      },
                      {
                        id: 'summary-stats',
                        label: 'Summary Stats',
                        icon: 'pi-chart-bar',
                        route: '/cases/cirp/claims/summary-stats',
                      },
                    ],
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
                        route: '/cases/cirp/eoi/expression',
                      },
                      {
                        id: 'resolution-plans-registry',
                        label: 'Resolution Plans Registry',
                        icon: 'pi-book',
                        route: '/cases/cirp/eoi/registry',
                      },
                      {
                        id: 'comparative-analysis',
                        label: 'Comparative Analysis',
                        icon: 'pi-chart-line',
                        route: '/cases/cirp/eoi/comparative-analysis',
                      },
                      {
                        id: 'bank-internal-assessment',
                        label: "Bank's Internal Assessment",
                        icon: 'pi-check-square',
                        route: '/cases/cirp/eoi/bank-assessment',
                      },
                      {
                        id: 'coc-approval',
                        label: 'CoC Approval',
                        icon: 'pi-check',
                        route: '/cases/cirp/eoi/coc-approval',
                      },
                      {
                        id: 'nclt-final-approval',
                        label: 'NCLT Final Approval',
                        icon: 'pi-verified',
                        route: '/cases/cirp/eoi/nclt-approval',
                      },
                    ],
                  },
                ],
              },
              {
                id: 'hearings',
                label: 'Hearings',
                icon: 'pi-calendar',
                route: '/cases/cirp/hearings',
              },
            ],
          },
        ]
      }
    ];
  }

  onItemClick(item: MenuItem): void {
    this.sidebarService.setSelectedItem(item.id);

    // If item has a route, navigate to it
    if (item.route) {
      this.router.navigate([item.route]);
    }

    // If item has children, open sub-sidebar with those children
    if (item.children && item.children.length > 0) {
      this.sidebarService.openSubSidebar(item.children, item.label);
    }

    // If item has a command, execute it
    if (item.command) {
      item.command();
    }
  }

  toggleDarkMode(): void {
    this.themeService.toggleTheme();
  }

  onUserClick(): void {
    // Placeholder for user profile click action
    console.log('User profile clicked');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
