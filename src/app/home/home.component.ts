import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="home">
      <h1>Welcome to the Home Page!</h1>
      <p>{{ userRole() === 'owner' ? 'You are logged in as an owner.' : 'You are logged in as a user.' }}</p>
      
      <!-- Toggle-knapp -->
      <button (click)="toggleRole()">Toggle to {{ userRole() === 'owner' ? 'User' : 'Owner' }}</button>
      
      <!-- Navbar med "Create Post"-knapp som endast visas för ägare -->
      <nav class="navbar">
        <button *ngIf="userRole() === 'owner'" (click)="createPost()">Create Post</button>
      </nav>
    </div>
  `,
  styles: [`
    .home {
      text-align: center;
      margin-top: 50px;
    }
    button {
      margin: 10px;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
    }
    .navbar {
      margin-top: 20px;
    }
  `]
})
export class HomeComponent {
  // Signal för att hantera användarroll
  userRole = signal<'user' | 'owner'>('user');

  // Växlar mellan rollerna "user" och "owner"
  toggleRole() {
    this.userRole.set(this.userRole() === 'user' ? 'owner' : 'user');
  }

  // Skapa ett nytt inlägg och spara det i localStorage
  createPost() {
    const post = { id: Date.now(), title: 'New Post', content: 'This is a new post.' };
    
    // Hämta befintliga inlägg från localStorage
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    
    // Lägg till det nya inlägget
    posts.push(post);
    
    // Uppdatera localStorage
    localStorage.setItem('posts', JSON.stringify(posts));
    alert('Post created and saved to localStorage!');
  }
}
