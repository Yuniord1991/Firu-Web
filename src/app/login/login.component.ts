import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../Services/user.service';
import { debounceTime, tap } from 'rxjs/operators';
import { AlertService } from '../Services/alert.service';
import { Router } from '@angular/router';
import { fieldVerificators } from '../Services/models/fieldVerificators.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;

  indexTab = true;
  genericList = [];

  invalidateUser;
  invalidateEmail;
  show;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private alertService: AlertService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.registerForm = this.fb.group({
      firstName: null,
      lastName: null,
      user: [
        "",
        Validators.compose([
          Validators.required,
          // Validators.email,
          // Validators.pattern("[0-9]*"),
        ]),
      ],
      email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.email,
          // Validators.pattern("[0-9]*"),
        ]),
      ],
      password: null,
    });

    this.loginForm = this.fb.group({
      userLog:  [
        "",
        Validators.compose([
          Validators.required
        ]),
      ],
      passwordLog:  [
        "",
        Validators.compose([
          Validators.required
        ]),
      ],
    });

    this.registerForm.valueChanges.pipe(debounceTime(1000)).subscribe(change => {
      this.userService.GetCheckingExistentFields(
        this.registerForm.get("firstName").value,
        this.registerForm.get("lastName").value,
        this.registerForm.get("user").value,
        this.registerForm.get("email").value
      ).subscribe((data:fieldVerificators) => {

        if (data.userName)
        {
          this.invalidateUser = true;
          this.registerForm.get("user").setErrors({'incorrect': true});
        }
        else
          this.invalidateUser = false;

        if (data.email)
        {
          this.invalidateEmail = true;
          this.registerForm.get("email").setErrors({'incorrect': true});
        }
        else
          this.invalidateEmail = false;
      });
    });
  }

  login()
  {
    this.userService.GetLogged(
      this.loginForm.get("userLog").value,
      this.loginForm.get("passwordLog").value
    ).subscribe(logged => {
      if(logged.login == true)
      {
        localStorage.removeItem('userLogged');

        var body = JSON.stringify(logged);
        localStorage.setItem('userLogged', body);

        console.log("almacenado en localStorage", localStorage.getItem('userLogged'));

        this.loginForm.reset();
        this.registerForm.reset();
        this.alertService.show("Logeado correctamente");
        this.router.navigate(["/main"]);
      }
    })
  }

  getUserErrorMessage() {
    var message;

    if(this.registerForm.get("user").hasError('required'))
    {
      message = 'Ingresa un nombre de usuario';
    }
    else if (this.invalidateUser == true)
    {
      message = 'Este usuario esta siendo usado por otra persona'
    }

    return message;
  }

  getEmailErrorMessage() {
    var message;

    if(this.registerForm.get("email").hasError('required'))
    {
      message = 'Ingresa un email';
    }
    else if (this.invalidateEmail == true)
    {
      message = 'Este email esta siendo usado por otra persona'
    }
    else if (this.registerForm.get("email").hasError('email'))
    {
      message = 'email invalido'
    }

    return message;
  }

  password() {
    this.show = !this.show;
  }

  selectedTab(event)
  {
    switch (event) {
      case 0:
        this.indexTab = true;
        break;
      case 1:
        this.indexTab = false;
        break;
      default:
        break;
    }
  }

  register()
  {
    if(!this.registerForm.invalid)
    {
      const body = JSON.stringify({
        'firstName': this.registerForm.get("firstName").value,
        'lastName': this.registerForm.get("lastName").value,
        'userName': this.registerForm.get("user").value,
        'email': this.registerForm.get("email").value,
        'password': this.registerForm.get("password").value
      });

      this.userService.post(body).subscribe(x => {
        this.alertService.show("Usuario registrado correctamente");

        this.registerForm.reset();
        this.loginForm.reset();
      })
    }
  }

}
