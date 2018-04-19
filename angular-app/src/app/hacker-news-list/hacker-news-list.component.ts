import { Component } from '@angular/core';
import { HackerNewsService } from './hacker-news.service';
import { Observable } from 'rxjs';
import { Story } from 'model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'hacker-news-list',
  template: `
    <p>hacker-news-list</p>
    <p>loading: {{ isLoading | async }}</p>
    <!--<input [value]="searchText | async" (change)="handleSearchTextChange($event)" />-->
    <input [ngModel]="searchText | async" (ngModelChange)="handleSearchTextChange($event)" />
    <ul>
      <li *ngFor="let story of stories | async">
        <p>{{ story.title }}</p>
      </li>
    </ul>
  `,
  styleUrls: ['./hacker-news-list.component.css'],
  providers: [HackerNewsService],
})
export class HackerNewsListComponent {

  stories: Observable<Story[]>;
  searchText: Observable<string>;
  isLoading: Observable<string>;

  constructor(private service: HackerNewsService) {
    const { newsList, searchText, loading } = service.model;
    this.stories = newsList as any;
    this.searchText = searchText as any;
    this.isLoading = loading.pipe(
      map(l => l ? 'true' : 'false') as any
    ) as any;
  }

  handleSearchTextChange(text: string) {
    this.service.model.changeSearchText(text);
  }

}
