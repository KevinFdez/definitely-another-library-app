import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthorService } from 'src/app/core/http/author.service';
import { DialogCreateAuthorComponent, CreateAuthorDialogData } from '../../components/dialog-create-author/dialog-create-author.component';
import { AuthorDataNotifierService } from '../../services/author-data-notifier.service';
import { SidebarService } from 'src/app/core/services/sidebar.service';

@Component({
	selector: 'app-authors',
	templateUrl: './authors.component.html',
	styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent {

	constructor(public dialog: MatDialog, private authorTableService: AuthorService,
		private authorDataListenerService: AuthorDataNotifierService, private sidebarService: SidebarService) {
		// empty
	}

	/**
	 * Este método abre el diálogo de creación de un nuevo autor. Al aceptar el diálogo se genera un nuevo registro
	 * en la tabla de autores.
	 */
	onClickCreateAuthorBtn(): void {
		const dialogRef = this.dialog.open<DialogCreateAuthorComponent, any, CreateAuthorDialogData>(DialogCreateAuthorComponent);

		dialogRef.afterClosed().subscribe(
			result => {
				if (!result) {
					return;
				}

				this.sidebarService.showLoading();
				this.authorTableService.createAuthor(result.firstName, result.lastName).subscribe(
					() => {
						this.sidebarService.hideLoading();
						this.authorDataListenerService.notifyDataHasChanged()
					},
					error => console.error(error)
				);
			},
			error => console.error(error)
		);
	}

}
