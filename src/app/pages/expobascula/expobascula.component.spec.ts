import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpobasculaComponent } from './expobascula.component';

describe('ExpobasculaComponent', () => {
  let component: ExpobasculaComponent;
  let fixture: ComponentFixture<ExpobasculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpobasculaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpobasculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
