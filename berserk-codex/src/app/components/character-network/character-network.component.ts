import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';
import { MockDataService } from '../../services/mock-data.service';
import {NgIf, NgFor} from '@angular/common';
import { CharacterEdge } from '../../types/character-edge';
import { CharacterNode } from '../../types/character-node';
import { GroupColor } from '../../types/group-colors';

@Component({
  selector: 'app-character-network',
  templateUrl: './character-network.component.html',
  styleUrls: ['./character-network.component.scss'],
  standalone: true, 
  imports : [NgFor, NgIf]
})
export class CharacterNetworkComponent implements AfterViewInit  {
  @ViewChild('networkContainer') networkContainer!: ElementRef;
  public network!: Network;
  public groups: Array<{ name: string; color: string }> = [];
  public tooltipContent = '';
  public tooltipVisible = false;
  public tooltipPosition = { x: 0, y: 0 };
  private groupColors: GroupColor = {};

  constructor(private mockData: MockDataService) {}

  ngAfterViewInit() {
    this.loadNetworkData(); 
  }

  private loadNetworkData() {
    this.mockData.getGroupColors().subscribe({
      next: (data: {groupColor: GroupColor}) => this.groupColors = data.groupColor,
      error: (err) => console.error('Erreur de chargement:', err)
    });
    
    this.mockData.getCharacterRelationships().subscribe({
      next: (data: { nodes: CharacterNode[]; edges: CharacterEdge[] }) => {
        this.processGroups(data.nodes);
        this.initNetwork(data);
      },
      error: (err) => console.error('Erreur de chargement:', err)
    });
  }

  private processGroups(nodes: CharacterNode[]) {
    this.groups = Array.from(new Set(nodes.map(n => n.group))).map(group => ({
      name: group,
      color: this.groupColors[group] || '#696969'
    }));
  }

  private initNetwork(data: { nodes: CharacterNode[]; edges: CharacterEdge[] }) {
    if (!this.isBrowser()) return; 
    const container = this.networkContainer.nativeElement; 
    if (!container) return;

    const nodes = new DataSet<CharacterNode>(
      data.nodes.map(node => ({
        ...node,
        shape: node.image ? 'circularImage' : 'dot',
        image: node.image || undefined,
        size: node.image ? 40 : 25,
        borderWidth: 2,
        color: this.getNodeColor(node.group)
      }))
    );

    const edges = new DataSet<CharacterEdge>(data.edges);

    this.network = new Network(container, { nodes, edges }, this.getNetworkOptions());
    this.network.on('hoverNode', (params) => this.displayTooltip(params, nodes));
    this.network.on('blurNode', () => {this.tooltipVisible = false;});
  }   
  
  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  private getNodeColor(group: string) {
    return {
      border: this.groups.find(g => g.name === group)?.color || '#696969',
      background: '#1a1a1a',
      highlight: { border: '#ff4500', background: '#2a2a2a' }
    };
  }

  private getNetworkOptions() {
    return {
      interaction: { hover: true, tooltipDelay: 200 },
      physics: { stabilization: { enabled: true, iterations: 100 } }
    };
  }

  private displayTooltip(params: any, nodes: DataSet<CharacterNode>) {
    const node = nodes.get(params.node) as unknown as CharacterNode | null;
      if (node?.bio) {
        this.tooltipContent = node.bio;
        this.tooltipVisible = true;
        this.tooltipPosition = { 
          x: params.event.pointer.DOM.x, 
          y: params.event.pointer.DOM.y 
        };
      }
    }
}
