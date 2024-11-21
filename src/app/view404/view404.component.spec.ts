import { ComponentFixture, TestBed } from '@angular/core/testing';

import { View404Component } from './view404.component';

describe('View404Component', () => {
  let component: View404Component;
  let fixture: ComponentFixture<View404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ View404Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(View404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
