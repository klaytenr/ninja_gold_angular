import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: String = 'Ninja Gold';
  ninja: any = {gold: 0, logs: []};
  gold: Number = 0;
  logs: any = [];
  leaders: any = [];
  constructor(private _httpService: HttpService){}
  ngOnInit(){
    this.create();
    this.leaderBoard();
  }
  create(){
    let ninja = this._httpService.createNinja(this.ninja);
    ninja.subscribe((data: any) => {
      if (data.error) {
        console.log(data.error);
      } else {
      }
    })
  }
  leaderBoard(){
    let people = this._httpService.getLeaders();
    people.subscribe((data: any) => {
      this.leaders = data.leader;
    })
  }
  farm(){
    let money = this._httpService.getFarm();
    money.subscribe((data: any) => {
      this.gold = data.ninja.gold;
      this.logs = data.ninja.logs;
    })
  }
  cave(){
    let money = this._httpService.getCave();
    money.subscribe((data: any) => {
      this.gold = data.ninja.gold;
      this.logs = data.ninja.logs;
    })
  }
  house(){
    let money = this._httpService.getHouse();
    money.subscribe((data: any) => {
      this.gold = data.ninja.gold;
      this.logs = data.ninja.logs;
    })
  }
  casino(){
    let money = this._httpService.getCasino();
    money.subscribe((data: any) => {
      this.gold = data.ninja.gold;
      this.logs = data.ninja.logs;
    })
  }
}
