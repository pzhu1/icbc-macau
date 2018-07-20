import {Component,Injectable} from '@angular/core';

import {Effect, Actions, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {map, tap,switchMap} from 'rxjs/operators';

import {CounterActions} from '../actions/counter.actions';
import {CounterService} from '../service/counter.service';

@Injectable()

export class CounterEffects {

    constructor(private actions$: Actions , private counterService:CounterService) {
    //constructor(private actions$: Actions ) {
        console.log('CounterEffects')
    }


    // @Effect() resetSuccess$ = this.actions$.pipe(
    //     ofType(CounterActions.Types.RESET),
    //     map(() => new CounterActions.ResetSuccessAction(1))
    // );
    @Effect() resetSuccess$ = this.actions$.pipe(
        ofType(CounterActions.Types.RESET),
        switchMap(_ => {
                return this.counterService.getValue().pipe(
                    map((data: number) => new CounterActions.IncrementSuccessAction(parseInt(data.toString())))
                )
            }
        )
    );

    // @Effect() incrementSuccess$ = this.actions$.pipe
    // (ofType(CounterActions.Types.INCREMENT),
    //     switchMap(_ => this.counterService.doAdd()
    //         .toPromise()
    //         .then(data=>{console.log(data)})
    //
    //     ),
    //     map((data)=>new CounterActions.IncrementSuccessAction(data)
    //         ));


    @Effect() incrementSuccess$ = this.actions$.pipe
    (ofType(CounterActions.Types.INCREMENT),
        switchMap(_ => {
            return this.counterService.doAdd().pipe(
                map((data: number) => new CounterActions.IncrementSuccessAction(parseInt(data.toString())))
            )
        }
        ))

}
