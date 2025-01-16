import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  template: `
    <h1>Blogginlägg {{ postId }}</h1>
    <p>Det här är innehållet för blogginlägg {{ postId }}.</p>
    <a routerLink="/blog">Tillbaka till alla inlägg</a>
  `,
  styles: [`
    h1 { color: #4CAF50; }
    a { text-decoration: none; color: #2196F3; }
  `]
})
export class BlogPostComponent {
  postId: string | null;

  constructor(private route: ActivatedRoute) {
    this.postId = this.route.snapshot.paramMap.get('id');
  }
}

