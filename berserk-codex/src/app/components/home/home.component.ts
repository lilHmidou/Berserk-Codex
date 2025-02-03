import { Component } from '@angular/core';
import { FeaturesComponent } from '../features/features.component';
import { NgIf } from '@angular/common' ;

@Component({
  standalone: true,
  imports: [FeaturesComponent, NgIf], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  
})
export class HomeComponent {
  public showFeatures = false; 

  public toggleFeatures() {
    this.showFeatures = !this.showFeatures;
  }
}