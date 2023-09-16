import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasculaComponent } from './bascula.component';

describe('BasculaComponent', () => {
  let component: BasculaComponent;
  let fixture: ComponentFixture<BasculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasculaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
