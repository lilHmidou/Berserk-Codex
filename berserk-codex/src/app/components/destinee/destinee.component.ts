import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgForOf, NgIf, NgOptimizedImage, NgStyle } from '@angular/common';

@Component({
  selector: 'app-destinee',
  templateUrl: './destinee.component.html',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf,
    NgForOf,
    NgStyle
  ],
  styleUrls: ['./destinee.component.scss']
})
export class DestineeComponent implements OnInit {
  choices = [
    { image: '/images/choix1.jpg', option1: 'Jour', option2: 'Nuit' },
    { image: '/images/choix2.jpg', option1: 'Sauver', option2: 'Laisser' },
    { image: '/images/choix3.jpg', option1: 'Aider', option2: 'Dominer' },
    { image: '/images/choix4.jpg', option1: 'Combattre', option2: "S'enfuir" },
    { image: '/images/choix5.jpg', option1: 'Courage', option2: 'Folie' },
  ];

  currentChoiceIndex = 0;
  path: string[] = [];
  finalDestiny: string | null = null;
  hoveredChoice: 'left' | 'right' | '' = '';

  particles: { x: number; y: number }[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Générer les particules uniquement côté client
      this.generateParticles();
    }
  }

  generateParticles(): void {
    this.particles = Array.from({ length: 200 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }));
  }

  makeChoice(choice: 'left' | 'right') {
    this.path.push(choice);

    if (this.currentChoiceIndex < this.choices.length - 1) {
      this.currentChoiceIndex++;
    } else {
      this.determineDestiny();
    }
  }

  determineDestiny() {
    const pathString = this.path.join('-');

    if (pathString.includes('left-left-left')) {
      this.finalDestiny = 'Sacrifice';
    } else if (pathString.includes('right-right-right')) {
      this.finalDestiny = 'God Hand';
    } else if (pathString.includes('left-right-left')) {
      this.finalDestiny = 'Apôtre';
    } else {
      this.finalDestiny = 'Paysan';
    }
  }

  setHover(choice: 'left' | 'right' | '') {
    this.hoveredChoice = choice;
  }
}
