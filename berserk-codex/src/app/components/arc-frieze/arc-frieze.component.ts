import { Component } from '@angular/core';
import {NgIf, NgFor} from '@angular/common';


interface StoryArc {
  id: number;
  title: string;
  period: string;
  summary: string;
  coverImage: string;
  plates: string[];
}

@Component({
  selector: 'app-arc-frieze',
  standalone: true,
  templateUrl: './arc-frieze.component.html',
  styleUrls: ['./arc-frieze.component.scss'],
  imports: [NgIf, NgFor]
  
})
export class ArcFriezeComponent {
  arcs: StoryArc[] = [
    {
      id: 1,
      title: 'L\'Âge d\'Or (1997-1998)',
      period: 'Volumes 1-14',
      summary: `Cet arc emblématique retrace l'ascension de Griffith et de la Bande du Faucon. 
              On y découvre Guts, mercenaire solitaire, qui rejoint progressivement le groupe. 
              Points clés :
              • La bataille de Doldrey
              • La relation complexe Guts/Griffith
              • Les prémices de l'Éclipse
              • La chute dramatique de Griffith`,
      coverImage: '/images/arcs/golden-age-cover.webp',
      plates: [
        '/images/arcs/golden-age-1.jpg',
        '/images/arcs/golden-age-2.png'
      ]
    },
    {
      id: 2,
      title: 'L\'Éclipse (1998)',
      period: 'Volume 13-14',
      summary: `L'apogée tragique de la saga. Après un an d'emprisonnement, Griffith déclenche 
              l'Éclipse pour accomplir son rêve. 
              Événements marquants :
              • Sacrifice de la Bande du Faucon
              • Transformation de Griffith en Femto
              • Naissance du Berserker Armor
              • Marque du sacrifice sur Guts et Casca`,
      coverImage: '/images/arcs/eclipse-cover.webp',
      plates: [
        '/images/arcs/eclipse-1.jpg',
        '/images/arcs/eclipse-2.webp'
      ]
    }
  ];

  selectedArc: StoryArc | null = null;
  currentIndex = 0;

  selectArc(arc: StoryArc, index: number): void {
    this.selectedArc = arc;
    this.currentIndex = index;
  }

  navigate(direction: 'prev' | 'next'): void {
    if (direction === 'prev' && this.currentIndex > 0) {
      this.currentIndex--;
    } else if (direction === 'next' && this.currentIndex < this.arcs.length - 1) {
      this.currentIndex++;
    }
    this.selectedArc = this.arcs[this.currentIndex];
  }
}