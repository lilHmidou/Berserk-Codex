import { Component, OnInit } from '@angular/core';
import {NgForOf, NgOptimizedImage} from '@angular/common';
import { MockDataService } from '../../services/mock-data.service';
import { Character } from '../../types/character';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-encyclopedie',
  templateUrl: './encyclopedie.component.html',
  imports: [
    NgForOf,
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive
  ],
  styleUrls: ['./encyclopedie.component.scss']
})
export class EncyclopediaComponent implements OnInit {
  private sortOrder: 'A-Z' | 'Z-A' | 'Apparition' = 'A-Z';
  private arcOrder = ['Prologue','Black Swordsman','L’Âge d’Or', 'Éclipse', 'L\'Âge Noir', 'L\'Âge du Faucon Millenaire'];
  private characters: Character[] = []

  constructor(private mockDataService: MockDataService) {}

    ngOnInit() {
      this.mockDataService.getCharacter().subscribe((data: { characters: Character[] }) => {
        this.characters = data.characters;
      });
    }

  get sortedCharacters(): Character[] {
    return [...this.characters].sort((a, b) => {
      if (this.sortOrder === 'A-Z') {
        return a.name.localeCompare(b.name);
      } else if (this.sortOrder === 'Z-A') {
        return b.name.localeCompare(a.name);
      } else {
        return this.arcOrder.indexOf(a.arc) - this.arcOrder.indexOf(b.arc);
      }
    });
  }


  setSortOrder(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const order = selectElement.value;

    if (order === 'A-Z' || order === 'Z-A' || order === 'Apparition') {
      this.sortOrder = order;
    }
  }


}
