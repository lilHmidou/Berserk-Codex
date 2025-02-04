import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  constructor(private http: HttpClient) { }

  public getMapEvents(): Observable<any> {
    return this.http.get('/mocks/map-events.json');
  }

  public getStoryArcs(): Observable<any> {
    return this.http.get('/mocks/story-arcs.json');
  }

  public getCharacter(): Observable<any> {
    return this.http.get('/mocks/character.json')
  }

  public getWeapons(): Observable<any> {
    return this.http.get('/mocks/weapons.json')
  }

  public getDestiny(): Observable<any>{
    return this.http.get('/mocks/destiny.json')
  }
  
  getCharacterRelationships(): Observable<any> {
    return this.http.get('/mocks/relationships.json');
  }

  getGroupColors(): Observable<any> {
    return this.http.get('/mocks/group-colors.json');
  }
}