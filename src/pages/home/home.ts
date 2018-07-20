
import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import {Store, select} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {CounterActions} from '../../actions/counter.actions';
import {AppState} from '../../app/app.status';
import {CounterService} from "../../service/counter.service";


const EventSource: any = window['EventSource'];


export interface User {
    id: number;
    name: string;
    phone: string;
    asset:number;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit{

    counter$: Observable<number>;

    constructor(public navCtrl: NavController,private store: Store<AppState> ,private counterService:CounterService) {
        //this.counter$ = this.store.pipe(select('counter', 'total'));
        this.store.dispatch(new CounterActions.ResetAction(1));
        this.counter$ = this.store.pipe(select('counter', 'total'));
    }

    decrement() {
        this.store.dispatch(new CounterActions.DecrementAction(1));
    }

    increment() {
        this.store.dispatch(new CounterActions.IncrementAction(1));
    }

    reset() {
        console.log('click reset!');
        this.store.dispatch(new CounterActions.ResetAction(1));
    }



    // users: User[];
    //
    //
    // ngOnInit() {
    //     this.counterService.findAll().subscribe(data => {
    //         console.log("data:",data)
    //         this.users = data;
    //     });
    // }

    ngOnInit() {}

    connect(){
        var source = new EventSource('http://localhost:8182/stream');
        source.onopen = function(event) {
            console.log('connected! ')
        };
        source.onmessage = function(event) {
            console.log("event.data:",event.data)
            var data = event.data;
            var origin = event.origin;
            var lastEventId = event.lastEventId;
            console.log(event)
        };
    }

    adduser(){
        console.log("addUser!!")
        this.counterService.addUser().toPromise().then(data=>console.log(data));
    }

    connect2(n){
        var source = new EventSource('http://localhost:8182/stream2/'+n.toString());
        source.onopen = function(event) {
            console.log('connected! ')
        };
        source.onmessage = function(event) {
            console.log("event.data:",event.data)
            var data = event.data;
            var origin = event.origin;
            var lastEventId = event.lastEventId;
            console.log(event)
        };
    }

    adduser2(n:any){
        console.log("addUser!!")
        this.counterService.addUser2(n).toPromise().then(data=>console.log(data));
    }

    adduser3(){
        console.log("addUser!!")
        this.counterService.addUser3().toPromise().then(data=>console.log(data));
    }

}
