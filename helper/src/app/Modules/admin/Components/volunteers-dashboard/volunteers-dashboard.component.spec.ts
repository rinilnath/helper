import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteersDashboardComponent } from './volunteers-dashboard.component';


describe('DashboardComponent', () => {
  let component: VolunteersDashboardComponent;
  let fixture: ComponentFixture<VolunteersDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteersDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteersDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
