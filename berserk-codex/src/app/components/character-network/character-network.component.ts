import { Component, OnInit } from '@angular/core';
import { DataSet, Network } from 'vis-network';
import { MockDataService } from '../../services/mock-data.service';
import {NgIf, NgFor} from '@angular/common';

interface CharacterNode {
  id: number;
  label: string;
  image?: string;
  bio?: string;
  group: string;
}

interface CharacterEdge {
  id: number;
  from: number;
  to: number;
  label: string;
  color: string;
}

@Component({
  selector: 'app-character-network',
  templateUrl: './character-network.component.html',
  styleUrls: ['./character-network.component.scss'],
  standalone: true, 
  imports : [NgFor, NgIf]
})
export class CharacterNetworkComponent implements OnInit {
  network!: Network;
  groups: Array<{ name: string; color: string }> = [];
  tooltipContent = '';
  tooltipVisible = false;
  tooltipPosition = { x: 0, y: 0 };

  constructor(private mockData: MockDataService) {}

  ngOnInit() {
    this.loadNetworkData();
  }

  private loadNetworkData() {
    this.mockData.getCharacterRelationships().subscribe({
      next: (data: { nodes: CharacterNode[]; edges: CharacterEdge[] }) => {
        this.processGroups(data.nodes);
        this.initNetwork(data);
      },
      error: (err) => console.error('Erreur de chargement:', err)
    });
  }

  private processGroups(nodes: CharacterNode[]) {
    const groupColors: { [key: string]: string } = {
      'Bande du Faucon': '#8b0000',
      'Nouvelle Bande du Faucon': '#4b0082',
      'Autres': '#696969'
    };

    this.groups = Array.from(new Set(nodes.map(n => n.group))).map(group => ({
      name: group,
      color: groupColors[group] || '#696969'
    }));
  }

  private initNetwork(data: { nodes: CharacterNode[]; edges: CharacterEdge[] }) {
    const container = document.getElementById('network-container');
    if (!container) return;

    const nodes = new DataSet<CharacterNode>(
      data.nodes.map(node => ({
        ...node,
        shape: node.image ? 'circularImage' : 'dot',
        image: node.image || undefined,
        size: node.image ? 40 : 25,
        borderWidth: 2,
        color: {
          border: this.getGroupColor(node.group),
          background: '#1a1a1a',
          highlight: {
            border: '#ff4500',
            background: '#2a2a2a'
          }
        }
      }))
    );

    const edges = new DataSet<CharacterEdge>(data.edges);

    this.network = new Network(container, { nodes, edges }, {
      interaction: {
        hover: true,
        tooltipDelay: 200
      },
      physics: {
        stabilization: {
          enabled: true,
          iterations: 100
        }
      }
    });

    this.network.on('hoverNode', (params) => {
      const node = nodes.get(params.node) as unknown as CharacterNode | null;
      if (node?.bio) {
        this.tooltipContent = node.bio;
        this.tooltipVisible = true;
        this.tooltipPosition = this.network!.getViewPosition() || { x: 0, y: 0 };
      }
    });

    this.network.on('blurNode', () => {
      this.tooltipVisible = false;
    });
  }

  private getGroupColor(groupName: string): string {
    return this.groups.find(g => g.name === groupName)?.color || '#696969';
  }
}