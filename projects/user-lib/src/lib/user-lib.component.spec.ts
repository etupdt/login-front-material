import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLibComponent } from './user-lib.component';

describe('UserLibComponent', () => {
  let component: UserLibComponent;
  let fixture: ComponentFixture<UserLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLibComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
