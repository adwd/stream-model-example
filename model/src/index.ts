import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, map, switchMap, tap, switchMapTo } from 'rxjs/operators';

export interface Story {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

export interface API {
  get: (url: string) => Promise<any>
}

export class HackerNewsList {
  constructor(private api: API) {}

  private _searchText = new BehaviorSubject('');
  public searchText = this._searchText.asObservable();
  public changeSearchText = (text: string) => this._searchText.next(text);

  private _loading = new BehaviorSubject(false);
  public loading = this._loading.asObservable();
  
  public newsList = this._searchText.pipe(
    debounceTime(500),
    switchMap(text => this._getTopStories(text)),
  )

  /**
   * Hacker newsのTopStoriesから50件を取得して、searchTitleでフィルタする
   * @param searchTitle title検索文字列
   */
  private _getTopStories = (searchTitle: string) => Observable.of(null).pipe(
    tap(() => this._loading.next(true)),
    switchMapTo(this.api.get('https://hacker-news.firebaseio.com/v0/topstories.json')),
    map((ids: number[]) => ids.slice(0, 50)),
    switchMap(ids => Promise.all(
      ids.map(id => this.api.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`))
    )),
    map((stories: Story[]) => stories.filter(({ title }) => title.includes(searchTitle))),
    tap(() => this._loading.next(false)),
  );
}
