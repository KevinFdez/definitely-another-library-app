import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { BooksComponent } from './pages/books/books.component';

const routes: Routes = [
	{ path: '', redirectTo: 'list', pathMatch: 'full' },
	{ path: 'list', component: BooksComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BookRoutingModule { }
