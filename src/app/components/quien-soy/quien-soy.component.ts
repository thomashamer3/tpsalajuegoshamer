import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-quien-soy',
  standalone: true,
  imports: [],
  templateUrl: './quien-soy.component.html',
  styleUrl: './quien-soy.component.css'
})
export class QuienSoyComponent {
  perfil: any;
  urlApi: string = 'https://api.github.com/users/thomashamer3';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(this.urlApi).subscribe((res) => (this.perfil = res));
  }
}
