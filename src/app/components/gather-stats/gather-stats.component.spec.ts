import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatherStatsComponent } from './gather-stats.component';

describe('GatherStatsComponent', () => {
  let component: GatherStatsComponent;
  let fixture: ComponentFixture<GatherStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GatherStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GatherStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
