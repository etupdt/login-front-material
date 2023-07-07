import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExemplairesComponent } from './exemplaires.component';

describe('ExemplairesComponent', () => {
  let component: ExemplairesComponent;
  let fixture: ComponentFixture<ExemplairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExemplairesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExemplairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
