import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root', // Gör den tillgänglig globalt
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
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]') as Post[];
    this.posts.set(savedPosts);
  }

  // Lägga till ett nytt inlägg
  addPost(post: Post) {
    const updatedPosts = [...this.posts(), post];
    this.posts.set(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  }
}

