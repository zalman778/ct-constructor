import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFullEntityComponent } from './list-full-entity.component';

describe('ListFullEntityComponent', () => {
  let component: ListFullEntityComponent;
  let fixture: ComponentFixture<ListFullEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFullEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFullEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
