import { Component, OnInit } from '@angular/core';
import {NgIf, NgFor} from '@angular/common';
import { MockDataService } from '../../services/mock-data.service';
import { MapEvent } from '../../types/map-event';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  imports: [NgIf, NgFor]
})
export class MapComponent implements OnInit{
  events: MapEvent[] = [];
  constructor(private mockDataService: MockDataService) {}

  ngOnInit() {
    this.mockDataService.getMapEvents().subscribe((
      data: { mapEvents: MapEvent[] }) => {
      this.events = data.mapEvents;
    });
  }

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