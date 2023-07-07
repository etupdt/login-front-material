import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindDialogComponent } from './find-dialog.component';
import { Livre } from '../interfaces/livre.interface';

describe('FindDialogComponent', () => {
  let component: FindDialogComponent<Livre>;
  let fixture: ComponentFixture<FindDialogComponent<Livre>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindDialogComponent<Livre>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
