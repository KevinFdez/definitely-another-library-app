import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderLayoutComponent } from './components/header-layout/header-layout.component';
import { MaterialModule } from 'src/app/modules/material/material.module';

@NgModule({
	declarations: [
		HeaderLayoutComponent
	],
	imports: [
		CommonModule,
		MaterialModule
	],
	exports: [
		HeaderLayoutComponent
	],
	providers: [],
})
export class HeaderModule { }
