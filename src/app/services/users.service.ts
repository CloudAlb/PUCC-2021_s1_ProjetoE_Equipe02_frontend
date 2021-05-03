import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseMessageOrErrors } from '../models/response-message-or-error';
import { SessionManagerService } from './session-manager.service';

interface Response {
  data: {
    id_user: string;
    name: string;
    username: string;
    avatar_image: string;
  }[];
}

interface UserColocationsArrayOrErrorResponse {
  data?: {
    tournament_id: string;
    tournament_name: string;
    tournament_game: string;
    tournament_description: string;
    colocation: 'participant' | 'semifinalist' | 'winner';
  }[];

  status?: 'error';
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private headers: HttpHeaders;

  getHeaders() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.sessionManagerService.getToken(),
    });
  }

  constructor(
    private http: HttpClient,
    private sessionManagerService: SessionManagerService
  ) {}

  getAllUsers(): Observable<Response> {
    return this.http.get<Response>(environment.baseUrl + '/users/list');
  }

  addCoins(
    id_user: string,
    quantity: number
  ): Observable<ResponseMessageOrErrors> {
    this.getHeaders();

    return this.http.patch<ResponseMessageOrErrors>(
      environment.baseUrl + '/users/coins/add',
      {
        id_user,
        quantity,
      },
      {
        headers: this.headers,
      }
    );
  }

  removeCoins(
    id_user: string,
    quantity: number
  ): Observable<ResponseMessageOrErrors> {
    this.getHeaders();

    return this.http.patch<ResponseMessageOrErrors>(
      environment.baseUrl + '/users/coins/remove',
      {
        id_user,
        quantity,
      },
      {
        headers: this.headers,
      }
    );
  }

  addFollow(id_user_following: string, id_user_followed: string) {
    this.getHeaders();

    return this.http.post<ResponseMessageOrErrors>(
      environment.baseUrl + '/follows/add',
      {
        id_user_followed,
      },
      {
        headers: this.headers,
      }
    );
  }

  removeFollow(id_user_following: string, id_user_followed: string) {
    this.getHeaders();

    return this.http.post<ResponseMessageOrErrors>(
      environment.baseUrl + '/follows/remove',
      {
        id_user_followed,
      },
      {
        headers: this.headers,
      }
    );
  }

  getColocations(
    id_user: string
  ): Observable<UserColocationsArrayOrErrorResponse> {
    this.getHeaders();

    return this.http.get<UserColocationsArrayOrErrorResponse>(
      environment.baseUrl + '/users/colocations/' + id_user,
      {
        headers: this.headers,
      }
    );
  }
}
