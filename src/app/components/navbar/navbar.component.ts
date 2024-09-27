import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Usuario } from '../../interfaces/usuario';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent{

}
