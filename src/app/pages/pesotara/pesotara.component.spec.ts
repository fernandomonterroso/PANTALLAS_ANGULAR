import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesotaraComponent } from './pesotara.component';

describe('PesotaraComponent', () => {
  let component: PesotaraComponent;
  let fixture: ComponentFixture<PesotaraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PesotaraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PesotaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
