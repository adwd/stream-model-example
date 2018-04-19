import { HackerNewsList } from 'model';

const get = (url: string) => fetch(url, {
  headers: {
    'Content-Type': 'application/json',
  },
  method: 'GET',
}).then(res => res.json());

export const model = new HackerNewsList({ get });
