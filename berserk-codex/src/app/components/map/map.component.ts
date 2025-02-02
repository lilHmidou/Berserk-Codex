import { Component } from '@angular/core';
import {NgIf, NgFor} from '@angular/common';

interface MapEvent {
  id: number;
  title: string;
  image: string;
  description: string;
  x: number; // Position horizontale en % (0-100)
  y: number; // Position verticale en % (0-100)
  chapter: number;
}

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  imports: [NgIf, NgFor]
})
export class MapComponent {
  events: MapEvent[] = [
    {
      id: 1,
      title: 'L\'Éclipse',
      image: '/images/events/eclipse.webp',
      description: 'Sacrifice de la Bande du Faucon par Griffith',
      x: 48.5,
      y: 37.2,
      chapter: 87
    },
    {
      id: 2,
      title: 'Forge de Godo',
      image: '/images/events/dragon-slayer.png',
      description: 'Création du Dragon Slayer',
      x: 32.1,
      y: 61.8,
      chapter: 94
    }
  ];

  selectedEvent: MapEvent | null = null;
  currentEventIndex = 0;

  showEvent(event: MapEvent): void {
    this.selectedEvent = event;
    this.currentEventIndex = this.events.findIndex(e => e.id === event.id);
  }

  navigate(direction: 'prev' | 'next'): void {
    if (direction === 'prev' && this.currentEventIndex > 0) {
      this.currentEventIndex--;
    } else if (direction === 'next' && this.currentEventIndex < this.events.length - 1) {
      this.currentEventIndex++;
    }
    this.selectedEvent = this.events[this.currentEventIndex];
  }

  closeModal(): void {
    this.selectedEvent = null;
  }
}