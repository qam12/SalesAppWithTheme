import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadercontentComponent } from './loadercontent.component';

describe('LoadercontentComponent', () => {
  let component: LoadercontentComponent;
  let fixture: ComponentFixture<LoadercontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadercontentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadercontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
