import {ActionReducerMap} from '@ngrx/store';
import {counterReducer} from '../reducers/counter.reducer';
import {AppState} from './app.status';

export const reducers: ActionReducerMap<AppState> = {
    counter: counterReducer
};
