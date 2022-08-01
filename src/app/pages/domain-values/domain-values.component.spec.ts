import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainValuesComponent } from './domain-values.component';

describe('DomainValuesComponent', () => {
  let component: DomainValuesComponent;
  let fixture: ComponentFixture<DomainValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DomainValuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
