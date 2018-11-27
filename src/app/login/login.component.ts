import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/AuthServices/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {



  form: FormGroup; 


  constructor(private router:Router, private user:AuthService,private fb: FormBuilder) { }

  // form; 
  // username: string;
  // password: string;
  // router: any;

  // constructor(private fb: FormBuilder,
  //   private myRoute: Router,
  //   private auth: AuthService) {
  //   this.form = fb.group({
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', Validators.required]
  //   });
  // }
  
  ngOnInit() {
  }

  loginUser(e) {
  	e.preventDefault();
  	console.log(e);
  	var username = e.target.elements[0].value;
  	var password = e.target.elements[1].value;
  	
  	if(username == 'admin' && password == 'admin123') {
      // this.sendToken(this.form.value.email);
      // this.router.navigate(['/google-map-component']);
      this.router.navigate(['/dashboard']);

      // alert("Welcome APAG");
      console.log("work");
    }
    else{
      alert("Server Validation and credential Error. Check IP address: http://176.181.101.10:2040/request");
    }
  }

  // login() : void {
  //   if(this.form.valid){
  //       	  this.username == 'admin@gmail.com' && this.password == 'admin'
  //           this.auth.sendToken(this.form.value.email);
  //           console.log(window.location.href)
  //           this.myRoute.navigate(["/dashboard"]);
  //            console.log("work");
  //   }else if(this.username == 'admin@gmail.com' && this.password == 'admin'){
  //           this.auth.sendToken(this.form.value.email);
  //           console.log(window.location.href)
  //           this.myRoute.navigate(["/dashboard"]);
  //           console.log("work 2");
  //   }
  // }

  }

