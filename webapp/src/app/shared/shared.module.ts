import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../modules/material/material.module';


@NgModule({
	imports: [
		CommonModule,
		MaterialModule
	]
})
export class SharedModule { }