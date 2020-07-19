import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { BooksComponent } from './pages/books/books.component';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';

const routes: Routes = [
	{ path: '', redirectTo: 'list', pathMatch: 'full' },
	{ path: 'list', component: BooksComponent },
	{ path: 'detail/:id', component: BookDetailComponent },
	{ path: 'create', component: BookDetailComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BookRoutingModule { }
