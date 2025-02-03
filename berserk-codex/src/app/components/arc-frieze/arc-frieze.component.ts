import { Component, OnInit } from '@angular/core';
import {NgIf, NgFor} from '@angular/common';
import { MockDataService } from '../../services/mock-data.service';
import { StoryArc } from '../../types/story-arc';

@Component({
  selector: 'app-arc-frieze',
  standalone: true,
  templateUrl: './arc-frieze.component.html',
  styleUrls: ['./arc-frieze.component.scss'],
  imports: [NgIf, NgFor]
  
})
export class ArcFriezeComponent implements OnInit{
  arcs: StoryArc[] = [];

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.mockDataService.getStoryArcs().subscribe((data: { storyArcs: StoryArc[] }) => {
      this.arcs = data.storyArcs;
    });
  }

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