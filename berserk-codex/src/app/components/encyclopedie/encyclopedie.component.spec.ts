import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncyclopediaComponent } from './encyclopedie.component';

describe('EncyclopediaComponent', () => {
  let component: EncyclopediaComponent;
  let fixture: ComponentFixture<EncyclopediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncyclopediaComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EncyclopediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sort characters alphabetically', () => {
    component.setSortOrder('A-Z');
    fixture.detectChanges();
    expect(component.sortedCharacters[0].name).toBe('Casca');
  });

  it('should sort characters by arc appearance', () => {
    component.setSortOrder('Apparition');
    fixture.detectChanges();
    expect(component.sortedCharacters[0].arc).toBe('L’Âge d’Or');
  });
});
