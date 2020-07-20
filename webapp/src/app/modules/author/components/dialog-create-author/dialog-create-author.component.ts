import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

export interface CreateAuthorDialogData {
	firstName: string;
	lastName: string;
}

@Component({
	selector: 'app-dialog-create-author',
	templateUrl: './dialog-create-author.component.html',
	styleUrls: ['./dialog-create-author.component.scss']
})
export class DialogCreateAuthorComponent {
	authorForm = new FormGroup({
		firstName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
		lastName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)])
	});

	constructor() {
		// empty
	}

}
