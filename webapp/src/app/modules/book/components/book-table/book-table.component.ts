import { Component, OnInit, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/core/http/book.service';
import { Book } from 'src/app/shared/models/book.model';
import { BookDataNotifierService } from '../../services/book-data-notifier.service';
import { Router } from '@angular/router';

const allowMultiSelect = false;

@Component({
	selector: 'app-book-table',
	templateUrl: './book-table.component.html',
	styleUrls: ['./book-table.component.scss']
})
export class BookTableComponent implements OnInit, OnDestroy {
	private selectionSubscription: Subscription;
	private tableDataSourceSubscription: Subscription;
	private bookDataListenerSubscription: Subscription;

	displayedColumns: string[] = ['select', 'id', 'name', 'isbn'];
	dataSource = new MatTableDataSource<Book>(undefined);
	selection = new SelectionModel<Book>(allowMultiSelect, []);

	@Output() selectedBook = new EventEmitter<Book[]>();

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(
		private bookDataListenerService: BookDataNotifierService,
		private bookTableService: BookService,
		private router: Router) {
		// empty
	}

	ngOnInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;

		this.selectionSubscription = this.selection.changed.subscribe(
			selected => {
				this.selectedBook.emit(selected.source.selected);
			},
			error => console.error(error)
		);

		this.updateDataSourceContent();

		this.bookDataListenerSubscription = this.bookDataListenerService.getBookDataListener().subscribe(
			() => this.updateDataSourceContent(),
			error => console.error(error)
		);
	}

	/**
	 * Este método lanza la petición de obtener el listado de libros y se suscribe.
	 */
	private updateDataSourceContent(): void {
		this.tableDataSourceSubscription = this.bookTableService.getAllBooks().subscribe(
			data => {
				this.selection.clear();
				this.dataSource.data = data;
			},
			error => console.error(error)
		);
	}

	ngOnDestroy() {
		this.selectionSubscription.unsubscribe();
		this.tableDataSourceSubscription.unsubscribe();
		this.bookDataListenerSubscription.unsubscribe();
	}

	/**
	 * Este método indica cuando se han seleccionado todas las entradas que conforman
	 * el datasource de la tabla.
	 *
	 * @returns True si todas las filas están seleccionadas, False si no lo están.
	 */
	isAllSelected(): boolean {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	}

	/**
	 * Este método es utilizado por el selector (checkbox) maestro ubicado en las cabeceras
	 * de la tabla. Si no hay elementos seleccionados, no lo están todos, selecciona todos los elementos.
	 * Si ya están todos los elementos de la tabla seleccionados los deselecciona.
	 */
	masterToggle(): void {
		this.isAllSelected() ?
			this.selection.clear() :
			this.dataSource.data.forEach(row => this.selection.select(row));
	}

	/**
	 * Este método recibe un registro de la entidad libro que ha sido seleccionado con doble click.
	 *
	 * @param row registro de la entidad libro pulsado.
	 */
	openRecordOnViewMode(row: Book): void {
		this.router.navigate(['/books/detail', row.id], { queryParams: { edit: false } });
	}
}
