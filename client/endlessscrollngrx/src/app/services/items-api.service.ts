import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemFilter, Item } from '../item';

@Injectable({ providedIn: 'root' })
export class ItemsApiService {
  constructor(private http: HttpClient) {}

  getAllItems(filterDto?: ItemFilter) {
    const url = 'https://localhost:5001/api/values';
    const filter = this.turnFilterIntoUrl(filterDto);

    return this.http.get<Item[]>(`${url}${filter}`);
  }

  private turnFilterIntoUrl(filterDto?: ItemFilter) {
    if (!filterDto) {
      return '';
    }

    if (!Object.entries(filterDto).length) {
      return '';
    }

    let urlFilter = '?';

    for (const [key, value] of Object.entries(filterDto)) {
      urlFilter += `${key}=${value}&`;
    }

    return urlFilter.substring(0, urlFilter.length - 1);
  }
}
