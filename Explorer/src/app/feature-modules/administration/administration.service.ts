import { HttpClient, HttpErrorResponse, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Equipment } from './model/equipment.model';
import { environment } from 'src/env/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { ApplicationReview } from './../marketplace/model/application-review.model';
import { User } from './model/user-account.model';
import { Profile } from './model/profile.model';
import { Follow} from './model/follow.model';
import { Message } from './model/message.model';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  constructor(private http: HttpClient) { }

  getEquipment(): Observable<PagedResults<Equipment>> {
    return this.http.get<PagedResults<Equipment>>(environment.apiHost + 'administration/equipment')
  }

  deleteEquipment(id: number): Observable<Equipment> {
    return this.http.delete<Equipment>(environment.apiHost + 'administration/equipment/' + id);
  }

  addEquipment(equipment: Equipment): Observable<Equipment> {
    return this.http.post<Equipment>(environment.apiHost + 'administration/equipment', equipment);
  }

  updateEquipment(equipment: Equipment): Observable<Equipment> {
    return this.http.put<Equipment>(environment.apiHost + 'administration/equipment/' + equipment.id, equipment);
  }



  getApplicationReview(): Observable<PagedResults<ApplicationReview>> {
    return this.http.get<PagedResults<ApplicationReview>>(environment.apiHost + 'tourist/applicationReview');
  }
  
  deleteApplicationReview(id: number): Observable<ApplicationReview> {
    return this.http.delete<ApplicationReview>(environment.apiHost + 'tourist/applicationReview' + id);
  }
  
  addApplicationReview(applicationReview: ApplicationReview): Observable<ApplicationReview> {
    return this.http.post<ApplicationReview>(environment.apiHost + 'tourist/applicationReview', applicationReview);
  }
  
  updateApplicationReview(applicationReview: ApplicationReview): Observable<ApplicationReview> {
    return this.http.put<ApplicationReview>(environment.apiHost + 'tourist/applicationReview' + applicationReview.id, applicationReview);
  }
  

  getUserAccounts():Observable<PagedResults<User>>{
    return this.http.get<PagedResults<User>>(environment.apiHost + 'administration/userAccounts')
  }
  
  deactivateUserAccount(user: User): Observable<User> {
    return this.http.put<User>(environment.apiHost + 'administration/userAccounts/' + user.id, user);
  }

  // PROFILE
  getById(message: Message): Observable<Profile> {
    return this.http.get<Profile>('https://localhost:44333/api/administration/profile/by-id/' + message.senderId);
  }

  getById2(message: Message): Observable<Profile> {
    return this.http.get<Profile>('https://localhost:44333/api/administration/profile2/by-id/' + message.senderId);
  }

  getByUserId(): Observable<Profile> {
    return this.http.get<Profile>('https://localhost:44333/api/administration/profile/by-user');
  }

  getByUserId2(): Observable<Profile> {
    return this.http.get<Profile>('https://localhost:44333/api/administration/profile2/by-user');
  }
  
  updateProfile(profile: Profile): Observable<Profile> {
    return this.http.patch<Profile>('https://localhost:44333/api/administration/profile/' + profile.id + '/' + profile.userId, profile);
  }

  updateProfile2(profile: Profile): Observable<Profile> {
    return this.http.patch<Profile>('https://localhost:44333/api/administration/profile2/' + profile.id + '/' + profile.userId, profile)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Request failed:', error);
          return throwError('An error occurred. Please try again later.');
        })
      );
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `https://localhost:44333/api/administration/profile/UploadFile`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  upload2(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `https://localhost:44333/api/administration/profile2/UploadFile`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
  
  getProfiles(): Observable<PagedResults<Profile>> {
    return this.http.get<PagedResults<Profile>>(environment.apiHost + 'administration/profile/all-profiles');
  }

  getProfiles2(): Observable<PagedResults<Profile>> {
    return this.http.get<PagedResults<Profile>>(environment.apiHost + 'administration/profile2/all-profiles');
  }


  // FOLLOW
  getFollows(profile: Profile): Observable<PagedResults<Profile>> {
    return this.http.get<PagedResults<Profile>>(environment.apiHost + 'administration/profile/all-following/' + profile.id);
  }

  getFollows2(profile: Profile): Observable<PagedResults<Profile>> {
    return this.http.get<PagedResults<Profile>>(environment.apiHost + 'administration/profile2/all-following/' + profile.id);
  }

  getAllFollowers(profile: Profile): Observable<PagedResults<Profile>> {
    return this.http.get<PagedResults<Profile>>(environment.apiHost + 'administration/profile/all-followers/' + profile.id);
  }

  getAllFollowers2(profile: Profile): Observable<PagedResults<Profile>> {
    return this.http.get<PagedResults<Profile>>(environment.apiHost + 'administration/profile2/all-followers/' + profile.id);
  }

  addFollow(follow: Follow): Observable<Follow> {
    return this.http.put<Follow>(environment.apiHost + 'administration/profile/AddFollow', follow);
  }

  addFollow2(follow: Follow): Observable<Follow> {
    return this.http.post<Follow>(environment.apiHost + 'administration/profile2/AddFollow', follow);
  }

  // MESSAGE
  addMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(environment.apiHost + 'administration/message', message);
  }

  addMessage2(message: Message): Observable<Message> {
    return this.http.post<Message>(environment.apiHost + 'administration/message2', message);
  }

  getAllUnreadMessages(profile: Profile): Observable<PagedResults<Message>> {
    return this.http.get<PagedResults<Message>>(environment.apiHost + 'administration/message/unread-messages/' + profile.id);
  }

  getAllUnreadMessages2(profile: Profile): Observable<PagedResults<Message>> {
    return this.http.get<PagedResults<Message>>(environment.apiHost + 'administration/message2/unread-messages/' + profile.id);
  }

  updateMessage(message: Message): Observable<Message> {
    return this.http.put<Message>('https://localhost:44333/api/administration/message/' + message.id + '/' + message.senderId + '/' + message.receiverId, message);
  }

  updateMessage2(message: Message): Observable<Message> {
    return this.http.put<Message>('https://localhost:44333/api/administration/message2/' + message.id + '/' + message.senderId + '/' + message.receiverId, message);
  }
}
