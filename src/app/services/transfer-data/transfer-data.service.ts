import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransferDataService {

  private data;

  constructor() {
  }

  setData(data) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

  clearData() {
    this.data = undefined;
  }
}
