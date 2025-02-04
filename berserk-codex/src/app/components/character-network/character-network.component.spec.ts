import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterNetworkComponent } from './character-network.component';

describe('CharacterNetworkComponent', () => {
  let component: CharacterNetworkComponent;
  let fixture: ComponentFixture<CharacterNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterNetworkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
