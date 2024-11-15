import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BranchDetailRouteComponent } from './branch-detail-route.component';

describe('BranchDetailRouteComponent', () => {
  let component: BranchDetailRouteComponent;
  let fixture: ComponentFixture<BranchDetailRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchDetailRouteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BranchDetailRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
