import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { TourReview } from './model/tour-review.model';
import { Injectable } from '@angular/core';
import { ApplicationReview } from './model/application-review.model'; // Updated import

import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';
import { Equipment } from '../administration/model/equipment.model';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  constructor(private http: HttpClient) { }


  
  getTourReview(): Observable<PagedResults<TourReview>> {
    return this.http.get<PagedResults<TourReview>>(environment.apiHost + 'tourist/tourReview')
  }
  getAverageGrade(tourId: number):Observable<any>{
    return this.http.get<any>(environment.apiHost + 'author/tour/average-grade/'+tourId)
  }

  getTourReviewByTourId(id: number): Observable<PagedResults<TourReview>> {
    return this.http.get<PagedResults<TourReview>>(environment.apiHost + 'tourist/tourReview/byTour/' + id);
  }
  
  deleteTourReview(id: number): Observable<TourReview> {
    return this.http.delete<TourReview>(environment.apiHost + 'tourist/tourReview/' + id);
  }

  addTourReview(tourReview: TourReview, userId: number): Observable<TourReview> {
    return this.http.post<TourReview>(environment.apiHost + 'tourist/tourReview/'+ userId, tourReview);
  }

  addImage(tourReview: TourReview): Observable<TourReview>{
    return this.http.post<TourReview>(environment.apiHost + 'tourist/tourReview/uploadFile', tourReview);
  }
  updateTourReview(tourReview: TourReview): Observable<TourReview> {
    return this.http.put<TourReview>(environment.apiHost + 'tourist/tourReview/' + tourReview.id, tourReview);
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `https://localhost:44333/api/tourist/tourReview/UploadFile`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  addApplicationReview(applicationReview: ApplicationReview): Observable<ApplicationReview> { 
    return this.http.post<ApplicationReview>(environment.apiHost + 'tourist/applicationReview', applicationReview); 
  }

  /*getApplicationReview(): Observable<PagedResults<ApplicationReview>> { 
    return this.http.get<PagedResults<ApplicationReview>>(environment.apiHost + 'tourist/applicationReview'); 
  }

  deleteApplicationReview(id: number): Observable<ApplicationReview> { 
    return this.http.delete<ApplicationReview>(environment.apiHost + 'tourist/applicationReview/' + id); 
  }

  updateApplicationReview(applicationReview: ApplicationReview): Observable<ApplicationReview> { 
    return this.http.put<ApplicationReview>(environment.apiHost + 'tourist/applicationReview/' + applicationReview.id, applicationReview); // Updated endpoint
  }*/
 
  
}
