import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Rutas de entrada principal. Contempla opciones de no-match y sin ruta especificada.
 * Cada módulo gestiona su propio routing una vez la ruta se mueve por el ámbito del módulo.
 * Objeto exportado para trabajar en el con los test.
 */
export const routes: Routes = [
	{ path: 'authors', loadChildren: () => import('./modules/author/author.module').then(module => module.AuthorModule) },
	{ path: 'books', loadChildren: () => import('./modules/book/book.module').then(module => module.BookModule) },
	{ path: '', redirectTo: 'books', pathMatch: 'full' },
	{ path: '**', redirectTo: 'books' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
