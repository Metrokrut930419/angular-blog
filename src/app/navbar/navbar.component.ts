import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav class="navbar">
      <div class="logo">
        <a routerLink="/">Min Blogg</a>
      </div>
      <ul class="nav-links">
        <li><a routerLink="/" routerLinkActive="active">Hem</a></li>
        <li><a routerLink="/blog" routerLinkActive="active">Blogg</a></li>
        <li><a routerLink="/about" routerLinkActive="active">Om oss</a></li>
        <li><a routerLink="/contact" routerLinkActive="active">Kontakt</a></li>
      </ul>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #4CAF50;
      padding: 10px 20px;
      color: white;
    }

    .logo a {
      text-decoration: none;
      font-size: 24px;
      font-weight: bold;
      color: white;
    }

    .nav-links {
      list-style: none;
      display: flex;
      gap: 20px;
    }

    .nav-links li {
      margin: 0;
    }

    .nav-links a {
      text-decoration: none;
      color: white;
      font-size: 16px;
      padding: 5px 10px;
    }

    .nav-links a.active {
      background-color: #3E8E41;
      border-radius: 5px;
    }

    .nav-links a:hover {
      background-color: #45A049;
      border-radius: 5px;
    }
  `]
})
export class NavbarComponent {}
