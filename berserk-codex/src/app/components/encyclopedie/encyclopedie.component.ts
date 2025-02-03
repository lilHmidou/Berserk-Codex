import { Component } from '@angular/core';
import {NgForOf, NgOptimizedImage} from '@angular/common';

interface Character {
  name: string;
  image: string;
  description: string;
  arc: string;
}

@Component({
  standalone: true,
  selector: 'app-encyclopedie',
  templateUrl: './encyclopedie.component.html',
  imports: [
    NgForOf,
    NgOptimizedImage
  ],
  styleUrls: ['./encyclopedie.component.scss']
})
export class EncyclopediaComponent {
  sortOrder: 'A-Z' | 'Z-A' | 'Apparition' = 'A-Z';

  characters: Character[] = [
    { name: 'Guts', image: '/images/guts.jpg', description: 'Le guerrier maudit et porteur du Dragon Slayer.', arc: 'Prologue' },
    { name: 'Griffith', image: '/images/griffith.jpg', description: 'Leader charismatique de la Bande du Faucon.', arc: 'L’Âge d’Or' },
    { name: 'Casca', image: '/images/casca.jpg', description: 'Brillante stratège et guerrière.', arc: 'L’Âge d’Or' },
    { name: 'Zodd', image: '/images/zodd.jpg', description: 'Démon immortel surnommé "Nosferatu".', arc: 'L’Âge d’Or' },
    { name: 'Skull Knight', image: '/images/skullknight.jpg', description: 'Un mystérieux chevalier spectral.', arc: 'Éclipse' },
  ];

  arcOrder = ['Prologue','L’Âge d’Or', 'Éclipse']; // Ordre des arcs narratifs

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
