import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from '../../_models/User';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../_services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../../_services/User.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm ;
  user: User;
  @HostListener('window:beforeunload', ['$event'])
  unLoadNotification($event: any) {
    if (this.editForm.dirty) { $event.returnValue = true; }
  }

  constructor(private route: ActivatedRoute , private aletrservice: AlertifyService
  , private userService: UserService , private authservice: AuthService ) { }

  ngOnInit() {
    this.route.data.subscribe( data =>  {
      this.user = data['user'];
    } );
  }

  updateUser() {
   this.userService.updateUser(this.authservice.decodedToken.nameid, this.user).subscribe(
     next => {
       this.aletrservice.success('updated Successfully');
     this.editForm.reset(this.user);
    }, error => {
     this.aletrservice.error(error);
    }); }
  }

