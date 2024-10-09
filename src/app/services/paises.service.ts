import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaisesService {
  private apiUrl = 'https://restcountries.com/v3.1/all';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((paises: { name: any; flags: any }[]) => {
        return paises.map((pais: { name: any; flags: any }) => ({
          name: pais.name.common,
          flag: pais.flags.png,
        }));
      })
    );
  }
}
