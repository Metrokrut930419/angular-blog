import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'blog',
    loadComponent: () => import('./components/blog-list/blog-list.component').then(m => m.BlogListComponent)
  },
  
  {
    path: 'blog/:id',
    loadComponent: () => import('./components/blog-post/blog-post.component').then(m => m.BlogPostComponent)
  },
  
  
  {
    path: '**',
    redirectTo: ''
  }
];

