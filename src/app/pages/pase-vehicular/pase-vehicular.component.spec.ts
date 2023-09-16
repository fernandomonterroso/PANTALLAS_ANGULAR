import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaseVehicularComponent } from './pase-vehicular.component';

describe('PaseVehicularComponent', () => {
  let component: PaseVehicularComponent;
  let fixture: ComponentFixture<PaseVehicularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaseVehicularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaseVehicularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
