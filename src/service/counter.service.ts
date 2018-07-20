import { Component,Injectable ,NgZone} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
//declare var EventSource;
const EventSource: any = window['EventSource'];
import { BehaviorSubject } from 'rxjs/Rx';

// @Injectable()
// export class Sse {
//
//     constructor(private zone: NgZone) { }
//
//     get(sseUrl: string): Observable<any> {
//         return new Observable<any>(obs => {
//             const es = new EventSource(sseUrl);
//             es.onmessage = evt => {
//                 const data = JSON.parse(evt.data);
//                 this.zone.run(() => obs.next(data));
//             };
//             return () => es.close();
//         });
//     }
//
// }

@Injectable()
export class CounterService{
    constructor(private http: HttpClient) {}

    // constructor(private http: HttpClient ,private sse: Sse) {
    //     this.sse.get('http://localhost:8182/stream').subscribe(data => {
    //         this.content$.next(data);
    //     });
    // }

    private content$ = new BehaviorSubject(null);

    findAll() {
        return this.content$.share();
    }

    doAdd(){
        return this.http.post('http://localhost:8182/add1money/9','')
    }
    getValue(){
        return this.http.get('http://localhost:8182/finduser/9')
    }

    addUser(){
        let data={
            "name": "zzz",
            "phone": "88833333",
            "asset": 0
        }
        return this.http.post('http://localhost:8182/createuser',data)
    }
    addUser2(n){
        let data={
            "id":n,
            "name": "zzz",
            "phone": "88833333",
            "asset": 0
        }
        return this.http.post('http://localhost:8182/createuser2',data)
    }

    addUser3(){
        let data=[
            {
            "id":123,
            "name": "zzz",
            "phone": "88833333",
            "asset": 0
        },{
                "id":234,
                "name": "zzz",
                "phone": "88833333",
                "asset": 0
            }
        ]
        return this.http.post('http://localhost:8182/createuser3',data)
    }


}

