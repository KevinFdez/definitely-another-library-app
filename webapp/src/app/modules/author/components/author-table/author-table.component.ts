import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Author } from 'src/app/shared/models/author.model';
import { Subscription } from 'rxjs';
import { AuthorService } from 'src/app/core/http/author.service';
import { AuthorDataNotifierService } from '../../services/author-data-notifier.service';

@Component({
	selector: 'app-author-table',
	templateUrl: './author-table.component.html',
	styleUrls: ['./author-table.component.scss']
})
export class AuthorTableComponent implements OnInit, OnDestroy {

	private tableDataSourceSubscription: Subscription;
	private authorDataListenerSubscription: Subscription;

	dataSource = new MatTableDataSource<Author>(undefined);
	displayedColumns: string[] = ['id', 'firstName', 'lastName'];

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(private authorTableService: AuthorService, private authorDataListenerService: AuthorDataNotifierService) {
		// empty
	}

	ngOnInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;

		this.updateDataSourceContent();

		this.authorDataListenerSubscription = this.authorDataListenerService.getAuthorDataListener().subscribe(
			() => this.updateDataSourceContent(),
			error => console.error(error)
		);
	}

	ngOnDestroy() {
		this.tableDataSourceSubscription.unsubscribe();
		this.authorDataListenerSubscription.unsubscribe();
	}

	/**
	 * Este método lanza la petición de obtener el listado de libros y se suscribe.
	 */
	private updateDataSourceContent(): void {
		this.tableDataSourceSubscription = this.authorTableService.getAllAuthors().subscribe(
			data => {
				this.dataSource.data = data;
			},
			error => console.error(error)
		);
	}
}
