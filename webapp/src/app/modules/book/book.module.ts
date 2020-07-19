import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { BookRoutingModule } from './book-routing.module';
import { BooksComponent } from './pages/books/books.component';


@NgModule({
	declarations: [
		BooksComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		MaterialModule,
		BookRoutingModule
	],
	exports: [
		BookRoutingModule
	]
})
export class BookModule { }
