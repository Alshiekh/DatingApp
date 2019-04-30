import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { User } from '../_models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   @Input() valuesFromHome: any;
   @Output() cancelRegister = new EventEmitter();
   user: User;
   registerForm: FormGroup;
   bsConfig: Partial<BsDatepickerConfig>;
  constructor(private authserveice: AuthService , private router: Router ,
     private alertify: AlertifyService , private fb: FormBuilder) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-dark-blue'
    };
    // this.registerForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    //   confirmPassword: new FormControl('', Validators.required)
    // } , this.passwordMatchValiditor);
    this.CreateRegisterForm();
  }
  CreateRegisterForm() {
    this.registerForm = this.fb.group({
      gender : ['male'],
    username : ['', Validators.required],
    knownAs : ['', Validators.required],
    dateOfBirth : [null, Validators.required],
    city : ['', Validators.required],
    country : ['', Validators.required],
    password : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)] ],
    confirmPassword: ['', Validators.required]
   } , { validator : this.passwordMatchValiditor});
  }
  passwordMatchValiditor(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value  ? null :  {'mismatch' :  true };
  }
  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authserveice.register(this.user).subscribe( () => {
          this.alertify.success('Registration Successfully');
         }
          , (error) => {
             this.alertify.error(error);
          } , () => {
            this.authserveice.login(this.user).subscribe( () => {
              this.router.navigate(['/members']);
            });
          });
    }
  }
  cancel() {
    this.cancelRegister.emit(false);
    // console.log('cancelled');
  }
}
