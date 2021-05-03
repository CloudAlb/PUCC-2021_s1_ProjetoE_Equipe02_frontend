import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface CadastroResponse {
  message?: string;

  token?: {
    token: string;
  };

  error?: string;
}

interface CadastroRequest {
  name: string;
  username: string;
  email: string;
  birth_date: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  constructor(private http: HttpClient) {}

  postCadastro(body: CadastroRequest): Observable<CadastroResponse> {
    return this.http.post(environment.baseUrl + '/users', body);
  }
}
