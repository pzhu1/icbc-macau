import {CounterActions} from '../actions/counter.actions';
import {CounterState, counterInitialState} from '../status/counter.state';
import * as cnt from '../actions/counter.actions'


export function counterReducer(state = counterInitialState, action: CounterActions.Actions ): CounterState {

    console.log(action);
    switch (action.type) {

        // case CounterActions.Types.INCREMENT:
        //
        //     return {
        //         ...state,
        //         total: state.total + 1
        //
        //
        //     };

        case CounterActions.Types.DECREMENT:
            return {
                ...state,
                total: state.total - 1

            };

        case CounterActions.Types.INCREMENT_SUCCESS:

            console.log(action.payload);
            return {
                ...state,
                total: action.payload
            } ;

        case CounterActions.Types.RESET_SUCCESS:

            console.log(action.payload);
            return {
                ...state,
                total: action.payload
            } ;
            //return counterInitialState;


        default: {
            return state;
        }
    }
}
