import { Injectable, signal } from '@angular/core';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts = signal<Post[]>([]);

  constructor() {
    this.loadPosts(); // Ladda inlägg vid initialisering
  }

  // Hämta alla inlägg
  getPosts() {
    return this.posts;
  }

  // Läsa inlägg från localStorage
  private loadPosts() {
    if (this.isBrowser()) {
      const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]') as Post[];
      this.posts.set(savedPosts);
    }
  }

  // Lägga till ett nytt inlägg
  addPost(post: Post) {
    const updatedPosts = [...this.posts(), post];
    this.posts.set(updatedPosts);
    if (this.isBrowser()) {
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
    }
  }

  // Kontrollera om vi är i webbläsarmiljö
  private isBrowser() {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  // (Frivilligt) Ta bort ett inlägg
  removePost(postId: number) {
    const updatedPosts = this.posts().filter(post => post.id !== postId);
    this.posts.set(updatedPosts);
    if (this.isBrowser()) {
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
    }
  }
}
