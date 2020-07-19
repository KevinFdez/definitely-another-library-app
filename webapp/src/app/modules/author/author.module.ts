import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { AuthorsComponent } from './pages/authors/authors.component';
import { AuthorRoutingModule } from './author-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
	declarations: [
		AuthorsComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		MaterialModule,
		AuthorRoutingModule
	],
	exports: [
		AuthorRoutingModule
	]
})
export class AuthorModule { }
