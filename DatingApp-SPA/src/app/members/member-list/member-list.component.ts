import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/User';
import { AlertifyService } from '../../_services/alertify.service';
import { UserService } from '../../_services/User.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];
  constructor(
    private userService: UserService,
    public alertyify: AlertifyService ,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.loadusers();
    this.route.data.subscribe(data => {
      this.users = data['users'];
     });
  }

  // loadusers() {
  //   this.userService.getUsers()
  //   .subscribe(result => {
  //       this.users = result;
  //     }
  //   );
}
