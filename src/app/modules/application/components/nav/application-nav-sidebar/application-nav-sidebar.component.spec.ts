import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ApplicationNavSidebarComponent} from './application-nav-sidebar.component';

describe('ApplicationNavSidebarComponent', () => {
  let component: ApplicationNavSidebarComponent;
  let fixture: ComponentFixture<ApplicationNavSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationNavSidebarComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ApplicationNavSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
