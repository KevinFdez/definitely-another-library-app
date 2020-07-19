import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthorsComponent } from './pages/authors/authors.component';

const routes: Routes = [
	{ path: '', redirectTo: 'list', pathMatch: 'full' },
	{ path: 'list', component: AuthorsComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuthorRoutingModule { }
