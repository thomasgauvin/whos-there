import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageViewersComponent } from './page-viewers.component';

describe('PageViewersComponent', () => {
  let component: PageViewersComponent;
  let fixture: ComponentFixture<PageViewersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageViewersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageViewersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
