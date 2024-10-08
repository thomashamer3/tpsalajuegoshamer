import { Component } from '@angular/core';
import { Usuario } from '../../interfaces/usuario';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent {
  newUser: Usuario = { email: '', password: '' };
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public loginService: LoginService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get fc() {
    return this.registerForm.controls;
  }

  createUser() {
    if (this.registerForm.valid) {
      if (this.setNewUser()) {
        this.loginService.register(this.newUser);
      }
    }
  }

  setNewUser(): boolean {
    const { email, password } = this.registerForm.value;
    this.newUser.email = email;
    this.newUser.password = password;
    return this.newUser.email && this.newUser.password ? true : false;
  }
}
