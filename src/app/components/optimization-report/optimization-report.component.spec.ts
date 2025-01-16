import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptimizationReportComponent } from './optimization-report.component';

describe('OptimizationReportComponent', () => {
  let component: OptimizationReportComponent;
  let fixture: ComponentFixture<OptimizationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptimizationReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptimizationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
