import { Component, signal, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <div class="blog-list">
      <h1>Blog Posts</h1>
      <ul>
        <li *ngFor="let post of blogPosts()">
          <h2>{{ post.title }}</h2>
          <p>{{ post.content }}</p>
          <small>Author: {{ post.author }}</small>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .blog-list {
      max-width: 600px;
      margin: 0 auto;
      font-family: Arial, sans-serif;
    }
    h1 {
      text-align: center;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      margin-bottom: 20px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 8px;
    }
  `]
})
export class BlogListComponent {
  // Signal to manage blog posts
  blogPosts = signal([
    { title: 'Angular 18 is here!', content: 'Learn about all the exciting new features...', author: 'John Doe' },
    { title: 'Understanding Signals', content: 'Signals make state management easier...', author: 'Jane Smith' },
    { title: 'Standalone Components', content: 'No more app.module! Discover how to use standalone components...', author: 'Alex Johnson' },
  ]);
}

