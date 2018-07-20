import {Action} from '@ngrx/store';

export namespace CounterActions {

    export const Types = {
        INCREMENT:'[Counter] Increment',
        DECREMENT: '[Counter] Decrement',
        RESET: '[Counter] Reset',
        RESET_SUCCESS: '[Counter] ResetSucess',
        INCREMENT_SUCCESS: '[Counter] IncrementSucess'
    };

    export class IncrementAction implements Action {
        constructor(public payload: number){
        }
        readonly type = Types.INCREMENT;

    }

    export class DecrementAction implements Action {
        constructor(public payload: number){
        }
        readonly type = Types.DECREMENT;
    }

    export class ResetAction implements Action {
        constructor(public payload: number){
            console.log('ResetAction')
        }
        readonly type = Types.RESET;
    }

    export class ResetSuccessAction implements Action {
        constructor(public payload: number){
            console.log('ResetSuccessAction')
        }
        readonly type = Types.RESET_SUCCESS;
    }

    export class IncrementSuccessAction implements Action {
        constructor(public payload: number){
            console.log('IncrementSuccessAction',payload)
        }
        readonly type = Types.INCREMENT_SUCCESS;
        readonly ss = this.payload;

    }

    export type Actions =
        IncrementAction
        | DecrementAction
        | ResetAction
        | ResetSuccessAction
        | IncrementSuccessAction;


}

