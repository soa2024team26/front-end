import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorage } from './jwt/token.service';
import { environment } from 'src/env/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Login } from './model/login.model';
import { AuthenticationResponse } from './model/authentication-response.model';
import { User } from './model/user.model';
import { Registration } from './model/registration.model';
import { Token } from './model/token.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ = new BehaviorSubject<User>({username: "", id: "", role: "" });

  constructor(private http: HttpClient,
    private tokenStorage: TokenStorage,
    private router: Router) { }

  login(login: Login): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticationResponse>('http://localhost:8080/api/login', login)
      .pipe(
        tap((authenticationResponse) => {
          this.tokenStorage.saveAccessToken(authenticationResponse.accessToken);
          this.setUser();
        })
      );
  }

  register(registration: Registration): Observable<AuthenticationResponse> {
    return this.http
    .post<AuthenticationResponse>('http://localhost:8080/api/users', registration);
  }

  logout(): void {
    this.router.navigate(['/home']).then(_ => {
      this.tokenStorage.clear();
      this.user$.next({username: "", id: "", role: "" });
      }
    );
  }

  checkIfUserExists(): void {
    const accessToken = this.tokenStorage.getAccessToken();
    if (accessToken == null) {
      return;
    }
    this.setUser();
  }

  getUsername(id: string): Observable<object> {
    return this.http.get(environment.apiHost + 'users/' + id);
  }

  getAllUserIds(): Observable<object> {
    return this.http.get('http://localhost:8080/api/userids');
  }

  private setUser(): void {
    const jwtHelperService = new JwtHelperService();
    const accessToken = this.tokenStorage.getAccessToken() || "";
    const user: User = {
      id: jwtHelperService.decodeToken(accessToken).id,
      username: jwtHelperService.decodeToken(accessToken).username,
      role: jwtHelperService.decodeToken(accessToken)[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ],
    };
    this.user$.next(user);
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${environment.apiHost}users/${userId}`);
  }
  
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', `http://localhost:8086/api/author/bundle/uploadBundleImage`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
    }
  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${environment.apiHost}users/getByEmail/${email}`);
  }

  createToken(token: Token, email: string): Observable<Token> {
    return this.http.post<Token>('http://localhost:8086/api/administrator/token/' + email, token);
  }

  getToken(value: string): Observable<Token> {
    return this.http.get<Token>('http://localhost:8086/api/administrator/token/' + value);
  }

  getAuthors(): Observable<PagedResults<User>> {
    return this.http.get<PagedResults<User>>(environment.apiHost + 'users/authors');
  }
}
