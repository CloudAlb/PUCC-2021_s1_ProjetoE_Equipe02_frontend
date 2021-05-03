// TODO: Arrumar esse servive | Verificar se irá precisar de models
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { SessionManagerService } from './session-manager.service';
import { PublicationInfo } from '../models/publication-info';

export interface PublicationResponse {
  message?: string,

  token?: {
    token: string;
  }

  error?: string;
}

interface PublicationRequest {
  id_tournament: string;
}

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private sessionManagerService: SessionManagerService) {
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.sessionManagerService.getToken(),
      });
    }

    public getPublications(): Observable<PublicationInfo> {
      return this.http.get<PublicationInfo>(environment.baseUrl + '/pubs', {
        headers: this.headers,
      });
    }

    public postPublication(body: PublicationRequest): Observable<PublicationResponse> {
      return this.http.post(environment.baseUrl + '/pubs/', body, {
        headers: this.headers,
      });
    }
}
