import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VpdPolicyComponent } from './vpd-policy.component';

describe('VpdPolicyComponent', () => {
  let component: VpdPolicyComponent;
  let fixture: ComponentFixture<VpdPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VpdPolicyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VpdPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
