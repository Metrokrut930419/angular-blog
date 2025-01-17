
import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { PostService } from './post.service';

@Injectable({
  providedIn: 'root', // Gör denna service tillgänglig globalt
})
export class CreatePostService {
  constructor(private postService: PostService) {}

  // Metod för att skapa ett nytt inlägg
  createNewPost(title: string, content: string): void {
    const newPost: Post = {
      id: Date.now(),
      title,
      content,
    };

    this.postService.addPost(newPost); // Lägg till inlägget via PostService
  }
}

