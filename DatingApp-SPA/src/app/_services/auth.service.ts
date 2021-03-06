import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    baseUrl = environment.apiUrl + 'Auth/';
    jwtHelper =  new JwtHelperService();
    decodedToken: any;
    currentUser: User;
    photoUrl = new BehaviorSubject<string>('../../assets/user.jpg');
    currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient) {}
   changeMemberPhoto(PhotoUrl: string) {
     this.photoUrl.next(PhotoUrl);
   }
  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).
    pipe(
      map(
        (response: any ) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            localStorage.setItem('user', JSON.stringify(user.user) );
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            this.currentUser = user.user;
           // console.log(this.decodedToken);
           this.changeMemberPhoto(this.currentUser.photoUrl);
          }
         }
      )
    );
  }

  register(user: User) {
    return this.http.post(this.baseUrl + 'register', user);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
