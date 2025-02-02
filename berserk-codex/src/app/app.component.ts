import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <app-home></app-home>
    <app-footer></app-footer>
  `,
  standalone: true,
  imports: [NavbarComponent, HomeComponent, FooterComponent],
})
export class AppComponent {
  title = 'berserk-codex';
}

