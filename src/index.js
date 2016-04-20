
// https://github.com/angular/angular.js/blob/master/src/ngResource/resource.js
// var User = $resource('/user/:userId', {userId:'@id'});
// const d = ::console.info;

import {defaultActions} from './defaults';
import {createActions} from './actions';
import {createReducers} from './reducers';
import {createTypes} from './types';


const mergeObjects = (object, ...sources) => {
  const concat = Array.prototype.concat;
  const uniqueKeys = concat.apply(Object.keys(object), sources.map(Object.keys))
    .filter((value, index, self) => self.indexOf(value) === index);
  return uniqueKeys.reduce((soFar, key) => {
    soFar[key] = Object.assign(soFar[key] || {}, ...sources.map(source => source[key] || {})); // eslint-disable-line no-param-reassign
    return soFar;
  }, object);
};

export function createResource({name, actions = {}, ...args}) {
  const actionsOpts = mergeObjects({}, defaultActions, actions);
  const types = createTypes({name, actions: actionsOpts, ...args});
  return {
    actions: createActions({name, types, actions: actionsOpts, ...args}),
    reducers: createReducers({types}),
    types
  };
}
