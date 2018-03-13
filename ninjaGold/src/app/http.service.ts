import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) {
  }
  createNinja(ninjaObj){
    return this._http.post('/create', ninjaObj);
  }
  getLeaders(){
    return this._http.get('/leaders');
  }
  getFarm(){
    return this._http.get('/farm');
  }
  getCave(){
    return this._http.get('/cave');
  }
  getHouse(){
    return this._http.get('/house');
  }
  getCasino(){
    return this._http.get('/casino');
  }
}
