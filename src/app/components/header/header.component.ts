import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Usuario } from '../../interfaces/usuario';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faUser, faHome, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  faUser = faUser;
  faHome = faHome;
  faRightFromBracket = faRightFromBracket;
  currentRoute: string = '';
  puntajeTotal: number = 0;

  currentUser: Usuario;

  constructor(private loginService: LoginService, public router: Router) {
    this.currentUser = {
      email: this.loginService.getLoggedUser(),
      password: '',
    };
  }

  @Output() sendCurrentUser: EventEmitter<Usuario> =
    new EventEmitter<Usuario>();

  ngOnInit() {
    if (this.loginService.getLoggedUser() == '') {
      this.logOut();
    } else {
      this.sendCurrentUser.emit(this.currentUser);
    }
  }

  logOut() {
    this.loginService.logOut();
    this.router.navigateByUrl('/login');
  }

  goBack() {
    this.currentRoute = this.router.url;
    if (this.currentRoute.includes('home')) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  redirectTo(route: string) {
    this.router.navigate([route]);
  }
}
