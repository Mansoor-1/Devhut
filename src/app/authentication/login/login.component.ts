import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  public regForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder , private authService: AuthService) {
    this.regForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  } 

  // convenience getter for easy access to form fields
  get f() { return this.regForm.controls; }

    onSubmit() {
      this.submitted = true;
      if (this.regForm.invalid) {
        return;
      } 

      let email = this.regForm.get('email').value
      let password = this.regForm.get('password').value

      this.authService.SignIn(email, password)
        
    }
    
  
  ngOnInit(): void {
  }

}
