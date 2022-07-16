import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGasolinerasComponent } from './dashboard-gasolineras.component';

describe('DashboardGasolinerasComponent', () => {
  let component: DashboardGasolinerasComponent;
  let fixture: ComponentFixture<DashboardGasolinerasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardGasolinerasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardGasolinerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
