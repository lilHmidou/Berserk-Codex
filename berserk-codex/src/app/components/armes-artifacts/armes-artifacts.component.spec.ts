import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmesArtifactsComponent } from './armes-artifacts.component';

describe('ArmesArtifactsComponent', () => {
  let component: ArmesArtifactsComponent;
  let fixture: ComponentFixture<ArmesArtifactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArmesArtifactsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArmesArtifactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
