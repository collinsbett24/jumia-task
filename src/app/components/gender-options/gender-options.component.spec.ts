import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderOptionsComponent } from './gender-options.component';

describe('GenderOptionsComponent', () => {
  let component: GenderOptionsComponent;
  let fixture: ComponentFixture<GenderOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenderOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenderOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
