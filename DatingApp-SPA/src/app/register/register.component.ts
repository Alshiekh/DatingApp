import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   @Input() valuesFromHome: any;
   @Output() cancelRegister = new EventEmitter();
   model: any = {};
  constructor(private authserveice: AuthService) { }

  ngOnInit() {
  }
  register() {
    console.log('test');
     this.authserveice.register(this.model).subscribe( () => {
      console.log('Registration Successfully');
     }
      , (error) => {
        console.log(error);
      } );
  }
  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }
}
