import { Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';

export const routes: Routes = [
  { path: 'BookList', component: BookListComponent, pathMatch: 'full' },
  { path: '', component: BookListComponent, pathMatch: 'full' },
  { path: '**', component: BookListComponent, pathMatch: 'full' },
];
