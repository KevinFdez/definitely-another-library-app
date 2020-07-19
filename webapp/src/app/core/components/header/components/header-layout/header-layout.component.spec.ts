import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLayoutComponent } from './header-layout.component';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HeaderComponent', () => {
	let component: HeaderLayoutComponent;
	let fixture: ComponentFixture<HeaderLayoutComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [HeaderLayoutComponent],
			imports: [MaterialModule, NoopAnimationsModule, HttpClientTestingModule]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HeaderLayoutComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
