import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { PrimeNG } from 'primeng/config';
import { LayoutComponents } from './layout/layout-module';
import { SidebarMode, SidebarService } from './layout/services/sidebar.service';
import { CommonModule } from '@angular/common';
import { ContentHeaderComponent } from './layout/components/content-header/content-header';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, TooltipModule, ...LayoutComponents, CommonModule, ContentHeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('nclt-main');
  readonly SidebarMode = SidebarMode;


  constructor(private primeng: PrimeNG, private router: Router, public sidebarService: SidebarService,
  ) { }

  ngOnInit() {
    this.primeng.ripple.set(true);
  }

  toggleDarkMode() {
    const element = document.querySelector('html');
    element?.classList.toggle('my-app-dark');
  }

}
