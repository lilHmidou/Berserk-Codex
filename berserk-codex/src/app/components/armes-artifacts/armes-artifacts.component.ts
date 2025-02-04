import { Component, OnInit } from '@angular/core';
import {NgIf, NgOptimizedImage} from '@angular/common';
import { MockDataService } from '../../services/mock-data.service';
import { Weapons } from '../../types/weapons';


@Component({
  selector: 'app-armes-artifacts',
  templateUrl: './armes-artifacts.component.html',
  imports: [
    NgOptimizedImage,
    NgIf
  ],
  standalone: true,
  styleUrls: ['./armes-artifacts.component.scss']
})
export class ArmesArtifactsComponent implements OnInit {
  public weaponsAndArt: Weapons[] = [];
  public currentIndex: number = 0;

  constructor(private mockDataService : MockDataService){}

  ngOnInit(): void {
      this.mockDataService.getWeapons().subscribe((data: { weapons: Weapons[] }) => {
        this.weaponsAndArt = data.weapons;
    });
  }

  public get currentWeapon(): Weapons {
    return this.weaponsAndArt[this.currentIndex];
  }

  public prevWeapon(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.weaponsAndArt.length - 1; // Retourne à la dernière arme
    }
  }

  public nextWeapon(): void {
    if (this.currentIndex < this.weaponsAndArt.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Retourne à la première arme
    }
  }
}
