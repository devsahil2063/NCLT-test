import { Component, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { PrimeNG } from 'primeng/config';
import { LayoutComponents } from './layout/layout-module';
import { SidebarMode, SidebarService } from './layout/services/sidebar.service';
import { CommonModule } from '@angular/common';
import { ContentHeaderComponent } from './layout/components/content-header/content-header';
import { combineLatest, filter, map, Observable, startWith } from 'rxjs';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, TooltipModule, ...LayoutComponents, CommonModule, ContentHeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('nclt-main');
  readonly SidebarMode = SidebarMode;

  // Observable to check if warning banner should be shown
  showWarningBanner$!: Observable<boolean>;

  constructor(private primeng: PrimeNG, private router: Router, public sidebarService: SidebarService,
  ) {
    // Initialize observable in constructor after dependencies are injected
    this.showWarningBanner$ = combineLatest([
      this.sidebarService.isSubSidebarOpen$,
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.router.url.includes('cases')),
        startWith(this.router.url.includes('cases'))
      )
    ]).pipe(
      map(([isSubSidebarOpen, isCasesRoute]) => isSubSidebarOpen && isCasesRoute)
    );
  }

  ngOnInit() {
    this.primeng.ripple.set(true);
  }

  toggleDarkMode() {
    const element = document.querySelector('html');
    element?.classList.toggle('my-app-dark');
  }

}
