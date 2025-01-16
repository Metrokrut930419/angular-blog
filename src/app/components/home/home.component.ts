import { Component, OnInit, signal } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="home">
      <h1>Welcome to the Home Page!</h1>
      <p>{{ userRole() === 'owner' ? 'You are logged in as an owner.' : 'You are logged in as a user.' }}</p>

      <!-- Toggle-knapp -->
      <button (click)="toggleRole()">Toggle to {{ userRole() === 'owner' ? 'User' : 'Owner' }}</button>

      <!-- Navbar med "Create Post"-knapp som endast visas för ägare -->
      <nav class="navbar">
        <button *ngIf="userRole() === 'owner'" (click)="showForm = !showForm">
          {{ showForm ? 'Close Post Form' : 'Create Post' }}
        </button>
      </nav>

      <!-- Formulär för att skapa ett nytt inlägg -->
      <div *ngIf="showForm" class="post-form">
        <h2>Create a New Post</h2>
        <form (submit)="createPost($event)">
          <label>
            Title:
            <input type="text" [(ngModel)]="newPost.title" required />
          </label>
          <label>
            Content:
            <textarea [(ngModel)]="newPost.content" required></textarea>
          </label>
          <button type="submit">Save Post</button>
        </form>
      </div>

      <!-- Lista med sparade inlägg -->
      <div class="posts" *ngIf="posts().length > 0">
        <h2>Saved Posts</h2>
        <ul>
          <li *ngFor="let post of posts()">
            <h3>{{ post.title }}</h3>
            <p>{{ post.content }}</p>
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class HomeComponent implements OnInit {
  userRole = signal<'user' | 'owner'>('user'); // Signal för användarroll
  posts = signal<Post[]>([]); // Signal för inlägg
  showForm = false; // Visar/gömmer formulär
  newPost = { title: '', content: '' }; // Nytt inlägg

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.loadPosts(); // Ladda inlägg vid initialisering
  }

  // Växla mellan roller
  toggleRole() {
    this.userRole.set(this.userRole() === 'user' ? 'owner' : 'user');
  }

  // Ladda sparade inlägg från servicen
  loadPosts() {
    const savedPosts = this.postService.getPosts()(); // Hämta signalens värde
    this.posts.set(savedPosts); // Sätt inlägg i signal
  }

  // Skapa ett nytt inlägg
  createPost(event: Event) {
    event.preventDefault(); // Förhindra sidladdning vid formulärskick

    if (!this.newPost.title || !this.newPost.content) {
      alert('Please fill in all fields!');
      return;
    }

    const post: Post = {
      id: Date.now(),
      title: this.newPost.title,
      content: this.newPost.content,
    };

    this.postService.addPost(post); // Lägg till nytt inlägg i servicen
    this.posts.set(this.postService.getPosts()()); // Uppdatera signal med aktuellt värde
    this.newPost = { title: '', content: '' }; // Rensa formuläret
    this.showForm = false;

    alert('Post created successfully!');
  }
}
