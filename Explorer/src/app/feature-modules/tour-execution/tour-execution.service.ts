import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';
import { TouristPosition } from './model/touristposition.model';
import { TourExecution } from './model/tourexecution.model';
import { Checkpoint } from '../tour-authoring/model/checkpoint.model';
import { Secret } from './model/secret.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { ActiveEncounter, Encounter } from '../challenges/model/encounter.model';

@Injectable({
  providedIn: 'root'
})
export class TourExecutionService {

  constructor(private http: HttpClient) { }


  getTourExecution(userId: string): Observable<TourExecution> {
    return this.http.get<TourExecution>('http://localhost:8086/api/tourexecution/get/' + userId);
  }
  completeTour(id?: Number): Observable<TourExecution> {
    return this.http.post<TourExecution>('http://localhost:8086/api/tourexecution/complete/' + id, {});
  }
  abandonTour(id?: Number): Observable<TourExecution> {
    return this.http.post<TourExecution>('http://localhost:8086/api/tourexecution/abandon/' + id, {});
  }
  updateTourExecution(tourExecution: TourExecution): Observable<TourExecution> {
    return this.http.put<TourExecution>('http://localhost:8086/api/tourexecution/' + tourExecution.id, tourExecution)
  }
  completeCheckpoint(id: string, checkpoints: Checkpoint[]): Observable<TourExecution> {
    return this.http.put<TourExecution>('http://localhost:8086/api/tourexecution/checkpointComplete/' + id, checkpoints);
  }
  getSecrets(cpId:number){
    return this.http.get<Secret>('http://localhost:8086/api/tourexecution/getSecret/' + cpId);
  }
  getEncounters():Observable<PagedResults<Encounter>>{
    return this.http.get<PagedResults<Encounter>>('http://localhost:8086/api/administrator/encounter');
  }
  getActiveEncounters():Observable<PagedResults<ActiveEncounter>>{
    return this.http.get<PagedResults<ActiveEncounter>>('http://localhost:8086/api/activeEncounter');
  }
  updateEncounter(encounter: Encounter): Observable<Encounter> {
    return this.http.put<Encounter>('http://localhost:8086/api/administrator/encounter', encounter)
  }
  postActiveEncounters(activeEncounter:ActiveEncounter):Observable<ActiveEncounter>{
    return this.http.post<ActiveEncounter>('http://localhost:8086/api/activeEncounter',activeEncounter);
  }
  updateActiveEncounters(activeEncounter:ActiveEncounter):Observable<ActiveEncounter>{
    return this.http.put<ActiveEncounter>('http://localhost:8086/api/activeEncounter',activeEncounter);
  }
  
  getTourExecutionByTourAndUser(tourId: number, userId: string): Observable<PagedResults<TourExecution>>{
    return this.http.get<PagedResults<TourExecution>>('http://localhost:8086/api/tourexecution/'+ tourId +'/' + userId);
  }

}
