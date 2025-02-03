import { Component, OnInit } from '@angular/core';
import { DataSet, Edge, Network, Node } from 'vis-network';
import { MockDataService } from '../../services/mock-data.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-character-network',
  standalone: true,
  templateUrl: './character-network.component.html',
  styleUrls: ['./character-network.component.scss'],
  imports: [NgFor]
})
export class CharacterNetworkComponent implements OnInit {
  network!: Network;

  constructor(private mockData: MockDataService) {}

  ngOnInit() {
    this.mockData.getCharacterRelationships().subscribe(data => {
      this.initNetwork(data);
    });
  }

  private initNetwork(data: any) {
    const container = document.getElementById('network-container');
    
    const nodes = new DataSet<Node>(data.nodes);
    const edges = new DataSet<Edge>(data.edges);

    this.network = new Network(container!, { nodes, edges }, {
      nodes: {
        shape: 'circularImage',
        size: 40,
        borderWidth: 2,
        color: {
          border: '#8b0000',
          background: '#1a1a1a'
        }
      },
      edges: {
        arrows: 'to',
        smooth: true
      },
      interaction: {
        hover: true
      }
    });
  }
}
