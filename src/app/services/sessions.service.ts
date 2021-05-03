import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';
import { SeuPerfilService } from './seu-perfil.service';

interface localUserData {
  id_user: string;
  name: string;
  username: string;
  avatar_image?: string;
}

interface LoginResponse {
  token?: {
    token: string;
    id_user: string;
  };

  status?: string;
  message?: string;
}

interface Request {
  login: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class SessionsService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  public postLogin(body: Request): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      environment.baseUrl + '/sessions',
      body
    );
  }

  public getUserData(): localUserData {
    // TODO, tratativa de erro?
    return this.localStorageService.getUserInfo();
  }
}
