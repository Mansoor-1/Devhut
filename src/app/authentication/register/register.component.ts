import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public regForm: FormGroup;
  submitted = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    this.regForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmpassword: ['', [Validators.required]],
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
    let firstname = this.regForm.get('firstname').value
    let lastname = this.regForm.get('lastname').value
    this.regForm.reset();
    

    this.authService.SignUp(email, password, firstname, lastname, '')
  

  }

  ngOnInit(): void {
  }

}
