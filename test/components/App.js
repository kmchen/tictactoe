import React from 'react';
import { store } from '../../src_users/store';
import { shallow, mount } from 'enzyme';
import { expect, assert } from 'chai';
import { Provider } from "react-redux";
import { App } from '../../src_users/components/App';

import jsdom from 'jsdom'
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.document = doc
global.window = doc.defaultView

it('Initialize 9 empty squares', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find('.square')).to.have.length(9);
});

it('winning backslash diagonals', () => {
    store.dispatch({type: 'INCREASE_GRID', payload: {
      status: [ Array(5).fill(null),
                Array(5).fill(null),
                Array(5).fill(null),
                Array(5).fill(null),
                Array(5).fill(null)
      ]}})
    store.dispatch({type: 'MAKE_MOVE', payload: {row: 0, col: 0, result: "X"}})
    store.dispatch({type: 'MAKE_MOVE', payload: {row: 1, col: 0, result: "O"}})
    store.dispatch({type: 'MAKE_MOVE', payload: {row: 1, col: 1, result: "X"}})
    store.dispatch({type: 'MAKE_MOVE', payload: {row: 2, col: 0, result: "O"}})
    store.dispatch({type: 'MAKE_MOVE', payload: {row: 2, col: 2, result: "X"}})
    store.dispatch({type: 'MAKE_MOVE', payload: {row: 3, col: 0, result: "O"}})
    store.dispatch({type: 'MAKE_MOVE', payload: {row: 3, col: 3, result: "X"}})
    store.dispatch({type: 'MAKE_MOVE', payload: {row: 4, col: 0, result: "O"}})
    store.dispatch({type: 'MAKE_MOVE', payload: {row: 4, col: 4, result: "X"}})
    const wrapper = mount(<App />);
    wrapper.instance().isWinning(4, 4);
    const appState = wrapper.state();
    expect(appState.winner).to.be.equal("X");
});

it('winning slash diagonals', () => {
    store.dispatch({type: 'INCREASE_GRID', payload: {
      status: [ Array(5).fill(null),
                Array(5).fill(null),
                Array(5).fill(null),
                Array(5).fill(null),
                Array(5).fill(null)
      ]}})
    store.dispatch({type: 'MAKE_MOVE', payload: {row: 0, col: 4, result: "X"}})
    store.dispatch({type: 'MAKE_MOVE', payload: {row: 1, col: 0, result: "O"}})
    store.dispatch({type: 'MAKE_MOVE', payload: {row: 1, col: 3, result: "X"}})
    store.dispatch({type: 'MAKE_MOVE', payload: {row: 2, col: 0, result: "O"}})
    store.dispatch({type: 'MAKE_MOVE', payload: {row: 2, col: 2, result: "X"}})
    store.dispatch({type: 'MAKE_MOVE', payload: {row: 3, col: 0, result: "O"}})
    store.dispatch({type: 'MAKE_MOVE', payload: {row: 3, col: 1, result: "X"}})
    store.dispatch({type: 'MAKE_MOVE', payload: {row: 4, col: 0, result: "O"}})
    store.dispatch({type: 'MAKE_MOVE', payload: {row: 4, col: 0, result: "X"}})
    const wrapper = mount(<App />);
    wrapper.instance().isWinning(4, 0);
    const appState = wrapper.state();
    expect(appState.winner).to.be.equal("X");
});

it('winning horizonally', () => {
    store.dispatch({type: 'INCREASE_GRID', payload: {
      status: [ Array(5).fill(null),
                Array(5).fill(null),
                Array(5).fill(null),
                Array(5).fill(null),
                Array(5).fill(null)
      ]}})
    store.dispatch({type: 'MAKE_MOVE', payload: {row: 0, col: 0, result: "X"}})
    store.dispatch({type: 'MAKE_MOVE', payload: {row: 1, col: 0, result: "O"}})
    store.dispatch({type: 'MAKE_MOVE', payload: {row: 0, col: 1, result: "X"}})
    store.dispatch({type: 'MAKE_MOVE', payload: {row: 2, col: 0, result: "O"}})
    store.dispatch({type: 'MAKE_MOVE', payload: {row: 0, col: 2, result: "X"}})
    store.dispatch({type: 'MAKE_MOVE', payload: {row: 3, col: 0, result: "O"}})
    store.dispatch({type: 'MAKE_MOVE', payload: {row: 0, col: 3, result: "X"}})
    store.dispatch({type: 'MAKE_MOVE', payload: {row: 4, col: 0, result: "O"}})
    store.dispatch({type: 'MAKE_MOVE', payload: {row: 0, col: 4, result: "X"}})
    const wrapper = mount(<App />);
    wrapper.instance().isWinning(0, 4);
    const appState = wrapper.state();
    expect(appState.winner).to.be.equal("X");
});

it('winning vertically', () => {
    store.dispatch({type: 'INCREASE_GRID', payload: {
      status: [ Array(5).fill(null),
                Array(5).fill(null),
                Array(5).fill(null),
                Array(5).fill(null),
                Array(5).fill(null)
      ]}})
    store.dispatch({type: 'MAKE_MOVE', payload: {row: 0, col: 2, result: "X"}})
    store.dispatch({type: 'MAKE_MOVE', payload: {row: 1, col: 0, result: "O"}})
    store.dispatch({type: 'MAKE_MOVE', payload: {row: 1, col: 2, result: "X"}})
    store.dispatch({type: 'MAKE_MOVE', payload: {row: 2, col: 0, result: "O"}})
    store.dispatch({type: 'MAKE_MOVE', payload: {row: 2, col: 2, result: "X"}})
    store.dispatch({type: 'MAKE_MOVE', payload: {row: 3, col: 0, result: "O"}})
    store.dispatch({type: 'MAKE_MOVE', payload: {row: 3, col: 2, result: "X"}})
    store.dispatch({type: 'MAKE_MOVE', payload: {row: 4, col: 0, result: "O"}})
    store.dispatch({type: 'MAKE_MOVE', payload: {row: 4, col: 2, result: "X"}})
    const wrapper = mount(<App />);
    wrapper.instance().isWinning(4, 2);
    const appState = wrapper.state();
    expect(appState.winner).to.be.equal("X");
});

it('getSlash function', () => {
    store.dispatch({type: 'INCREASE_GRID', payload: {
      status: [ Array(3).fill(null),
                Array(3).fill(null),
                Array(3).fill(null),
      ]}})
    store.dispatch({type: 'MAKE_MOVE', payload: {row: 1, col: 1, result: "X"}})
    const wrapper = mount(<App />);
    const matrix = store.getState()['moves']['status'];
    const diagonalSlashMatrix = wrapper.instance().getSlash(matrix, 1, 1);
    expect(diagonalSlashMatrix).to.deep.equal([null, "X", null]);
});

it('getBackSlash function', () => {
    store.dispatch({type: 'INCREASE_GRID', payload: {
      status: [ Array(3).fill(null),
                Array(3).fill(null),
                Array(3).fill(null),
      ]}})
    store.dispatch({type: 'MAKE_MOVE', payload: {row: 2, col: 2, result: "X"}})
    const wrapper = mount(<App />);
    const matrix = store.getState()['moves']['status'];
    const diagonalSlashMatrix = wrapper.instance().getBackSlash(matrix, 2, 2);
    expect(diagonalSlashMatrix).to.deep.equal([null, null, "X"]);
});
