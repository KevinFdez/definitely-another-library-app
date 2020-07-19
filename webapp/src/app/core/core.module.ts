import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../modules/material/material.module';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { HttpModule } from './http/http.module';
import { HeaderModule } from './components/header/header.module';
import { MenuSidebarComponent } from './components/sidebar/menu-sidebar/menu-sidebar.component';
import { SidebarComponent } from './components/sidebar/sidebar/sidebar.component';


@NgModule({
	imports: [
		MaterialModule,
		CommonModule,
		HttpClientModule,
		AppRoutingModule,
		HttpModule,
		HeaderModule
	],
	declarations: [
		SidebarComponent,
		MenuSidebarComponent
	],
	exports: [
		HttpModule,
		SidebarComponent,
		HeaderModule
	]
})
export class CoreModule { }
