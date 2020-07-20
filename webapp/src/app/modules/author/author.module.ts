import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { AuthorsComponent } from './pages/authors/authors.component';
import { AuthorTableComponent } from './components/author-table/author-table.component';
import { DialogCreateAuthorComponent } from './components/dialog-create-author/dialog-create-author.component';
import { AuthorDataNotifierService } from './services/author-data-notifier.service';
import { AuthorRoutingModule } from './author-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		AuthorsComponent,
		AuthorTableComponent,
		DialogCreateAuthorComponent
	],
	entryComponents: [
		DialogCreateAuthorComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		MaterialModule,
		AuthorRoutingModule,
		ReactiveFormsModule
	],
	exports: [
		AuthorRoutingModule
	],
	providers: [
		AuthorDataNotifierService
	]
})
export class AuthorModule { }
