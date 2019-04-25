import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/User';

// const httpOptions = {
//   headers: new HttpHeaders({'Authorization' : 'Bearer' + localStorage.getItem('token') })
// };

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

   getUsers(): Observable<User[]> {
     return this.http.get<User[]>(this.baseUrl + 'User');
   }

   getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'User/' + id);
  }
  updateUser(id: number , user: User) {
    return this.http.put(this.baseUrl + 'User/' + id, user);
  }
  setMainPhoto(UserId: number , id: number) {
    return this.http.post(this.baseUrl + 'users/' + UserId + '/photos/' + id + '/setMain', {});
  }
  deletePhoto(userId: number , id: number) {
    return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
  }
}
