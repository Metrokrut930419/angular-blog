import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'blog',
    loadComponent: () => import('./blog-list/blog-list.component').then(m => m.BlogListComponent)
  },
  {
    path: 'blog/:id',
    loadComponent: () => import('./blog-post/blog-post.component').then(m => m.BlogPostComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.component').then(m => m.AboutComponent)
  },
  
  {
    path: '**',
    redirectTo: ''
  }
];

