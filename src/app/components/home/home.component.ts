import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Usuario } from '../../interfaces/usuario';
import { LoginService } from '../../services/login.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  currentUser: Usuario;
  constructor(public loginService: LoginService, public router: Router) {
    this.currentUser = {
      email: this.loginService.getLoggedUser(),
      password: '',
    };
  }

  ngOnInit(): void {
    this.currentUser.email = this.loginService.getLoggedUser();
  }
  redirectTo(route: string) {
    this.router.navigate([route]);
  }
}
