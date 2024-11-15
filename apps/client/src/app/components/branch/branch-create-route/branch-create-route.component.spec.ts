import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BranchCreateRouteComponent } from './branch-create-route.component';

describe('BranchCreateRouteComponent', () => {
  let component: BranchCreateRouteComponent;
  let fixture: ComponentFixture<BranchCreateRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchCreateRouteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BranchCreateRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
