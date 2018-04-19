import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HackerNewsList } from 'model';

@Injectable()
export class HackerNewsService {
  model: HackerNewsList;
  constructor(private http: HttpClient) {

    this.model = new HackerNewsList({ get: (url: string) => http.get(url).toPromise() });
  }

}
