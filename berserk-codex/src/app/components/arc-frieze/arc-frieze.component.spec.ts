import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcFriezeComponent } from './arc-frieze.component';

describe('ArcFriezeComponent', () => {
  let component: ArcFriezeComponent;
  let fixture: ComponentFixture<ArcFriezeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArcFriezeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArcFriezeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
