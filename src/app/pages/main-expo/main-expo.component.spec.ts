import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainExpoComponent } from './main-expo.component';

describe('MainExpoComponent', () => {
  let component: MainExpoComponent;
  let fixture: ComponentFixture<MainExpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainExpoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainExpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
