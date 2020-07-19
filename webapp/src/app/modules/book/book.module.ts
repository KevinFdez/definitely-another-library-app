import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { BookRoutingModule } from './book-routing.module';
import { BooksComponent } from './pages/books/books.component';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BookTableComponent } from './components/book-table/book-table.component';
import { BookDialogDeleteComponent } from './components/book-dialog-delete/book-dialog-delete.component';
import { BookDataNotifierService } from './services/book-data-notifier.service';


@NgModule({
	declarations: [
		BooksComponent,
		BookDetailComponent,
		BookTableComponent,
		BookDialogDeleteComponent
	],
	entryComponents: [
		BookDialogDeleteComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		MaterialModule,
		BookRoutingModule,
		ReactiveFormsModule
	],
	exports: [
		BookRoutingModule
	],
	providers: [
		BookDataNotifierService
	]
})
export class BookModule { }
