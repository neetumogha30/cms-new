import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectUrlComponent } from './direct-url.component';

describe('DirectUrlComponent', () => {
  let component: DirectUrlComponent;
  let fixture: ComponentFixture<DirectUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectUrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
