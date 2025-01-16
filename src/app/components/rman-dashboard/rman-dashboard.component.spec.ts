import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmanDashboardComponent } from './rman-dashboard.component';

describe('RmanDashboardComponent', () => {
  let component: RmanDashboardComponent;
  let fixture: ComponentFixture<RmanDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RmanDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RmanDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
