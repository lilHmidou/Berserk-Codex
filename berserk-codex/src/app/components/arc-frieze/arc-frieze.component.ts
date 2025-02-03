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
  public arcs: StoryArc[] = [];

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.mockDataService.getStoryArcs().subscribe((data: { storyArcs: StoryArc[] }) => {
      this.arcs = data.storyArcs;
    });
  }

  public selectedArc: StoryArc | null = null;
  public currentIndex = 0;

  public selectArc(arc: StoryArc, index: number): void {
    this.selectedArc = arc;
    this.currentIndex = index;
  }

  public navigate(direction: 'prev' | 'next'): void {
    if (direction === 'prev' && this.currentIndex > 0) {
      this.currentIndex--;
    } else if (direction === 'next' && this.currentIndex < this.arcs.length - 1) {
      this.currentIndex++;
    }
    this.selectedArc = this.arcs[this.currentIndex];
  }
}