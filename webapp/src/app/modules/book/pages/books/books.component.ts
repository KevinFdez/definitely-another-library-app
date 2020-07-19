import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SidebarService } from 'src/app/core/services/sidebar.service';
import { Book } from 'src/app/shared/models/book.model';
import { BookService } from 'src/app/core/http/book.service';
import { BookDialogDeleteComponent } from '../../components/book-dialog-delete/book-dialog-delete.component';
import { BookDataNotifierService } from '../../services/book-data-notifier.service';

@Component({
	selector: 'app-books',
	templateUrl: './books.component.html',
	styleUrls: ['./books.component.scss']
})
export class BooksComponent {

	editBtnDisabled: boolean;
	deleteBtnDisabled: boolean;
	selectedBook: Book;

	constructor(
		private router: Router,
		public dialog: MatDialog,
		private bookService: BookService,
		private bookDataListenerService: BookDataNotifierService,
		private sidebarService: SidebarService) {
		this.editBtnDisabled = true;
		this.deleteBtnDisabled = true;
	}

	/**
	 * Este método es llamado cuando se selecciona un registro de la tabla
	 * de libros. Habilita o deshabilita los botones de acción.
	 */
	onBookSelected(selectedBook: Book[]): void {
		if (selectedBook.length >= 1) {
			this.deleteBtnDisabled = false;
			this.editBtnDisabled = false;
		} else {
			this.deleteBtnDisabled = true;
			this.editBtnDisabled = true;
		}

		this.selectedBook = selectedBook[0];
	}

	/**
	 * Este método lleva al componente de detalle del libro con el ID del libro para rellenar el formulario
	 * con los datos del libro seleccionado y permitir su edición.
	 */
	onClickEditBookBtn(): void {
		this.router.navigate(['/books/detail', this.selectedBook.id], { queryParams: { edit: true } });
	}

	/**
	 * Este método abre una diálogo de confirmación para el borrado del registro seleccionado
	 * de la tabla de libros. Si se acepta el diálogo se manda la petición de borrado del registro seleccionado.
	 */
	onClickDeleteBookBtn(): void {
		const dialogRef = this.dialog.open(BookDialogDeleteComponent);

		dialogRef.afterClosed().subscribe(result => {
			if (!result) {
				return;
			}

			this.sidebarService.showLoading();
			const bookId = this.selectedBook.id;
			this.bookService.deleteBook(bookId).subscribe(
				() => {
					this.sidebarService.hideLoading();
					this.bookDataListenerService.notifyDataHasChanged();
				},
				error => console.error(error)
			);
		});
	}
}
