import {Injectable } from '@angular/core';
import { User } from '../_models/User';
import {Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/User.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {

    constructor(private userService: UserService ,
     private router: Router ,
     private alertifyservice: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
         return this.userService.getUser(route.params['id']).pipe(
             catchError( error => {
                 this.alertifyservice.error('Problem reteriving data');
                 this.router.navigate(['/members']);
                 return of(null);
             })
         );
    }
}
