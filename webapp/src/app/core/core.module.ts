import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../modules/material/material.module';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { HttpModule } from './http/http.module';


@NgModule({
	imports: [
		MaterialModule,
		CommonModule,
		HttpClientModule,
		AppRoutingModule,
		HttpModule
	],
	exports: [
		HttpModule
	]
})
export class CoreModule { }
