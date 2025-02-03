import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

interface Weapon {
  name: string;
  image: string;
  description: string;
}

@Component({
  selector: 'app-armes-artifacts',
  templateUrl: './armes-artifacts.component.html',
  imports: [
    NgOptimizedImage
  ],
  standalone: true,
  styleUrls: ['./armes-artifacts.component.scss']
})
export class ArmesArtifactsComponent {
  weapons: Weapon[] = [
    { name: 'Dragon Slayer', image: '/images/dragon-slayer.png', description: 'Une épée géante utilisée par Guts.' },
    { name: 'Behelith', image: '/images/behelith.jpg', description: 'Serez-vous élu de la prophétie ?' },
    { name: 'Zodd\'s Sword', image: '/images/zodd-sword.jpg', description: 'Une épée impressionnante utilisée par Nosferatu Zodd.' },
  ];

  currentIndex: number = 0;

  get currentWeapon(): Weapon {
    return this.weapons[this.currentIndex];
  }

  prevWeapon(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.weapons.length - 1; // Retourne à la dernière arme
    }
  }

  nextWeapon(): void {
    if (this.currentIndex < this.weapons.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Retourne à la première arme
    }
  }
}
