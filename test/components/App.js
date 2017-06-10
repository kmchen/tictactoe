import React from 'react';
import { store } from '../../src_users/store';
import { shallow, mount } from 'enzyme';
import { expect, assert } from 'chai';
import { Provider } from "react-redux";
import App from '../../src_users/components/App';

import jsdom from 'jsdom'
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.document = doc
global.window = doc.defaultView

it('Initialize 9 empty squares', () => {
    store.dispatch({type: 'MAKE_MOVE', payload: {position: 0, result: "x"}})
    const wrapper = mount(
        <Provider store={store}>
            <App />
        </Provider>
        );
    expect(wrapper.find('.square')).to.have.length(9);
});

it('renders 9 squares', () => {
    store.dispatch({type: 'MAKE_MOVE', payload: {position: 0, result: "X"}})
    store.dispatch({type: 'MAKE_MOVE', payload: {position: 1, result: "O"}})
    store.dispatch({type: 'MAKE_MOVE', payload: {position: 4, result: "X"}})
    store.dispatch({type: 'MAKE_MOVE', payload: {position: 2, result: "O"}})
    store.dispatch({type: 'MAKE_MOVE', payload: {position: 8, result: "X"}})
    const wrapper = mount(
        <Provider store={store}>
            <App />
        </Provider>
        );
    const getChildProps = child => wrapper.find('.square').at(child).props().children
    expect(getChildProps(0)).to.be.equal("X");
    expect(getChildProps(4)).to.be.equal("X");
    expect(getChildProps(8)).to.be.equal("X");
    expect(getChildProps(1)).to.be.equal("O");
    expect(getChildProps(2)).to.be.equal("O");
});
