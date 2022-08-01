import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KioscComponent } from './kiosc.component';

describe('KioscComponent', () => {
  let component: KioscComponent;
  let fixture: ComponentFixture<KioscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KioscComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KioscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
