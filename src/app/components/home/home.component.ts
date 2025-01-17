import { Component, OnInit, signal } from '@angular/core';
import { PostService } from '../../services/post.service';
import { CreatePostService } from '../../services/create-post.service';
import { Post } from '../../models/post';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="home">
  <h1>Welcome to the Home Page!</h1>
  <p>{{ userRole() === 'owner' ? 'You are logged in as an owner.' : 'You are logged in as a user.' }}</p>

  <button (click)="toggleRole()">Toggle to {{ userRole() === 'owner' ? 'User' : 'Owner' }}</button>

  <nav class="navbar">
    <button *ngIf="userRole() === 'owner'" (click)="showForm = !showForm">
      {{ showForm ? 'Close Post Form' : 'Create Post' }}
    </button>
  </nav>

  <div *ngIf="showForm" class="post-form">
    <h2>Create a New Post</h2>
    <form (submit)="createPost($event)">
      <label>
        Title:
        <input type="text" [(ngModel)]="newPost.title" name="title" required />
      </label>
      <label>
        Content:
        <textarea [(ngModel)]="newPost.content" name="content" required></textarea>
      </label>
      <button type="submit">Save Post</button>
    </form>
  </div>

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
  userRole = signal<'user' | 'owner'>('user');
  posts = signal<Post[]>([]);
  showForm = false;
  newPost = { title: '', content: '' };

  constructor(
    private postService: PostService,
    private createPostService: CreatePostService // Injecta CreatePostService
  ) {}

  ngOnInit() {
    this.loadPosts();
  }

  toggleRole() {
    this.userRole.set(this.userRole() === 'user' ? 'owner' : 'user');
  }

  loadPosts() {
    this.posts.set(this.postService.getPosts()());
  }

  createPost(event: Event) {
    event.preventDefault();

    if (!this.newPost.title || !this.newPost.content) {
      alert('Please fill in all fields!');
      return;
    }

    // Använd CreatePostService för att skapa ett nytt inlägg
    this.createPostService.createNewPost(this.newPost.title, this.newPost.content);

    // Uppdatera inläggslistan
    this.posts.set(this.postService.getPosts()());
    this.newPost = { title: '', content: '' }; // Rensa formuläret
    this.showForm = false;

    alert('Post created successfully!');
  }
}
