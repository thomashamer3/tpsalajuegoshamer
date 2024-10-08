import { Component} from '@angular/core';
import { Usuario } from '../../interfaces/usuario';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  loginUsuario: Usuario = { email: '', password: '' };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastrService,
    private loginService: LoginService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  login() {
    this.loginService.addToLogger(this.loginUsuario.email);
    this.loginUsuario.email = this.loginForm.controls['email'].value;
    this.loginUsuario.password = this.loginForm.controls['password'].value;
    this.loginService.logIn(this.loginUsuario);
  }

  logeoRapido() {
    this.loginForm.controls['email'].setValue('usuariorapido@gmail.com');
    this.loginForm.controls['password'].setValue('usuariorapido');
  }

  irRegistro = () => this.router.navigateByUrl('/registro');
}
