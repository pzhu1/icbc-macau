import {CounterState} from '../status/counter.state';

export interface AppState {
    readonly counter: CounterState;
}
