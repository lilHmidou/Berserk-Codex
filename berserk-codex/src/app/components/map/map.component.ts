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
  public events: MapEvent[] = [];
  constructor(private mockDataService: MockDataService) {}

  ngOnInit() {
    this.mockDataService.getMapEvents().subscribe((
      data: { mapEvents: MapEvent[] }) => {
      this.events = data.mapEvents;
    });
  }

  public selectedEvent: MapEvent | null = null;
  public currentEventIndex = 0;

  public showEvent(event: MapEvent): void {
    this.selectedEvent = event;
    this.currentEventIndex = this.events.findIndex(e => e.id === event.id);
  }

  public navigate(direction: 'prev' | 'next'): void {
    if (direction === 'prev' && this.currentEventIndex > 0) {
      this.currentEventIndex--;
    } else if (direction === 'next' && this.currentEventIndex < this.events.length - 1) {
      this.currentEventIndex++;
    }
    this.selectedEvent = this.events[this.currentEventIndex];
  }

  public closeModal(): void {
    this.selectedEvent = null;
  }
}