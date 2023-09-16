import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesocargaComponent } from './pesocarga.component';

describe('PesocargaComponent', () => {
  let component: PesocargaComponent;
  let fixture: ComponentFixture<PesocargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PesocargaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PesocargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
