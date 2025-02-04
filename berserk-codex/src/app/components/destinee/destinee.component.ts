import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgForOf, NgIf, NgOptimizedImage, NgStyle } from '@angular/common';
import { Destiny } from '../../types/destiny';
import { MockDataService } from '../../services/mock-data.service';

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
  public choices: Destiny[] = [];
  public currentChoiceIndex = 0;
  public path: string[] = [];
  public finalDestiny: string | null = null;
  public hoveredChoice: 'left' | 'right' | '' = '';
  public particles: { x: number; y: number }[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: object, private mockDataService: MockDataService) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.generateParticles();
    }
    this.mockDataService.getDestiny().subscribe((data: { destinys: Destiny[] }) => {
      this.choices = data.destinys;
    });
  }

  generateParticles(): void {
    this.particles = Array.from({ length: 200 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }));
  }

  makeChoice(choice: 'left' | 'right'): void {
    this.path.push(choice);
    if (this.currentChoiceIndex < this.choices.length - 1) {
      this.currentChoiceIndex++;
    } else {
      this.determineDestiny();
    }
  }

  determineDestiny(): void {
    const pathString = this.path.join('-');

    if (pathString.includes('left-left-left')) {
      this.finalDestiny = 'Sacrifice'; 
    } else if (pathString.includes('right-right-right')) {
      this.finalDestiny = 'God Hand'; 
    } else if (pathString.includes('left-right-left')) {
      this.finalDestiny = 'Apôtre'; 
    } else if (pathString.includes('right-left-right')) {
      this.finalDestiny = 'Compagnon de Guts'; 
    } else {
      this.finalDestiny = 'Paysan'; 
    }
  }

  setHover(choice: 'left' | 'right' | ''): void {
    this.hoveredChoice = choice;
  }
}
