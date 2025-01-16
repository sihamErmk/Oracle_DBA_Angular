import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdeComponent } from './tde.component';

describe('TdeComponent', () => {
  let component: TdeComponent;
  let fixture: ComponentFixture<TdeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TdeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TdeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
