import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  constructor(private http: HttpClient) { }

  getMapEvents(): Observable<any> {
    return this.http.get('/mocks/map-events.json');
  }

  getStoryArcs(): Observable<any> {
    return this.http.get('/mocks/story-arcs.json');
  }

  getCharacterRelationships(): Observable<any> {
    return this.http.get('/mocks/relationships.json');
  }
}