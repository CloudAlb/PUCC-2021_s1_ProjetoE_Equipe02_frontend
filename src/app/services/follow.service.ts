import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseMessageOrErrors } from '../models/response-message-or-error';
import { UserInfo } from '../models/user-info';
import { SessionManagerService } from './session-manager.service';

interface ResponseBooleanDataOrErrors {
  data?: boolean;

  status?: 'error';
}

interface ResponseDataOrErrors {
  data?: string;

  status?: 'error';
}

interface ResponseUserDataOrErrors {
  data?: {
    user_following: {
      id_user: string;
      name: string;
      username: string;
    }[];
  };

  status?: 'error';
}

@Injectable({
  providedIn: 'root',
})
export class FollowService {
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private sessionManagerService: SessionManagerService
  ) {}

  getHeaders() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.sessionManagerService.getToken(),
    });
  }

  checkIfUserIsFollowing(
    id_user_followed: string
  ): Observable<ResponseBooleanDataOrErrors> {
    this.getHeaders();

    return this.http.get<ResponseBooleanDataOrErrors>(
      environment.baseUrl + '/follows/check/' + id_user_followed,
      {
        headers: this.headers,
      }
    );
  }

  followUser(id_user_followed: string): Observable<ResponseDataOrErrors> {
    this.getHeaders();

    return this.http.post<ResponseDataOrErrors>(
      environment.baseUrl + '/follows/add/',
      { id_user_followed },
      {
        headers: this.headers,
      }
    );
  }

  unfollowUser(id_user_followed: string): Observable<ResponseDataOrErrors> {
    this.getHeaders();

    return this.http.delete<ResponseDataOrErrors>(
      environment.baseUrl + '/follows/remove/' + id_user_followed,
      {
        headers: this.headers,
      }
    );
  }

  getFollowers(id_user: string): Observable<ResponseUserDataOrErrors> {
    this.getHeaders();

    return this.http.get<ResponseUserDataOrErrors>(
      environment.baseUrl + '/follows/get/' + id_user,
      {
        headers: this.headers,
      }
    );
  }
}
