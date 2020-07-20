import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Book } from 'src/app/shared/models/book.model';
import { BookService } from 'src/app/core/http/book.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Author } from 'src/app/shared/models/author.model';
import { AuthorService } from 'src/app/core/http/author.service';
import { Subscription } from 'rxjs';
import { SidebarService } from 'src/app/core/services/sidebar.service';
import { BookDataNotifierService } from '../../services/book-data-notifier.service';


@Component({
	selector: 'app-book-detail',
	templateUrl: './book-detail.component.html',
	styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit, OnDestroy {
	private listAuthorsSubscription: Subscription;

	book: Book;
	authors: Author[];
	isFormEnabled: boolean;

	bookForm = new FormGroup({
		name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
		isbn: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
		authorId: new FormControl('', [Validators.required])
	});

	constructor(
		private route: ActivatedRoute, private location: Location, private bookService: BookService,
		private authorTableService: AuthorService, private sidebarService: SidebarService,
		private bookDataListenerService: BookDataNotifierService) {
		// empty
	}

	ngOnInit(): void {
		this.setViewMode();
		this.getBook();
		this.listAuthorsSubscription = this.authorTableService.getAllAuthors().subscribe(
			data => this.authors = data,
			error => console.error(error)
		);
	}

	ngOnDestroy(): void {
		this.listAuthorsSubscription.unsubscribe();
	}

	/**
	 * Este método prepara la vista para mostrar su modo edición o modo lectura.
	 */
	private setViewMode(): void {
		const editParam: string = this.route.snapshot.queryParamMap.get('edit');
		this.isFormEnabled = editParam !== null && editParam === 'false' ? false : true;

		if (this.isFormEnabled) {
			this.bookForm.controls['name'].enable();
			this.bookForm.controls['isbn'].enable();
			this.bookForm.controls['authorId'].enable();
		} else {
			this.bookForm.controls['name'].disable();
			this.bookForm.controls['isbn'].disable();
			this.bookForm.controls['authorId'].disable();
		}

	}

	/**
	 * Este método obtiene un libro para rellenar los campos del formulario si en la URL se
	 * ha especificado un ID de libro.
	 */
	private getBook(): void {
		const idBook = this.route.snapshot.paramMap.get('id');

		if (idBook) {
			this.sidebarService.showLoading();
			this.bookService.getBook(Number.parseInt(idBook, 10))
				.subscribe(
					book => {
						this.book = book;
						this.bookForm.patchValue(this.book);
						this.sidebarService.hideLoading();
					},
					error => {
						console.error('Ha habido un error al obtener el libro con id: %s \n %s', idBook, error);
						this.sidebarService.hideLoading();
					}
				);
		}
	}

	/**
	 * Este método vuelve a la dirección de URL anterior.
	 */
	goBack(): void {
		this.location.back();
	}

	/**
	 * Este método actualiza la variable local de libro para ser utilizada para transportar los nuevos datos.
	 */
	private updateBookVar(): void {
		this.book.name = this.bookForm.value.name;
		this.book.isbn = this.bookForm.value.isbn;
		this.book.authorId = this.bookForm.value.authorId;
	}

	/**
	 * Este método guarda los valores de la ficha detalle del libro. Si es un libro nuevo, no tiene ID,
	 * llama a generar un nuevo libro. Si contiene ID llama a actualizar libro actual.
	 */
	save(): void {
		this.sidebarService.showLoading();

		if (this.book != null) {
			this.updateBookVar();
			this.bookService.updateBook(this.book).subscribe(
				() => {
					this.sidebarService.hideLoading();
					this.goBack();
					this.bookDataListenerService.notifyDataHasChanged();
				},
				error => {
					console.error('Ha habido un error al actualizar el libro existente: \n %s', error);
					this.sidebarService.hideLoading();
				}
			);

		} else {
			this.bookService.createBook(
				this.bookForm.get('name').value,
				this.bookForm.get('isbn').value,
				this.bookForm.get('authorId').value
			)
				.subscribe(
					() => {
						this.sidebarService.hideLoading();
						this.goBack();
						this.bookDataListenerService.notifyDataHasChanged();
					},
					error => {
						console.error('Ha habido un error al guardar un nuevo libro: \n %s', error);
						this.sidebarService.hideLoading();
					}
				);
		}
	}
}
