import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestineeComponent } from './destinee.component';

describe('DestineeComponent', () => {
  let component: DestineeComponent;
  let fixture: ComponentFixture<DestineeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestineeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DestineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly determine a destiny', () => {
    component.makeChoice('left');
    component.makeChoice('left');
    component.makeChoice('left');
    component.makeChoice('left');
    component.makeChoice('left');
    expect(component.finalDestiny).toBe('Sacrifice');
  });
});
