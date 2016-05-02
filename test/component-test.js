import './setup';

import React from 'react';
import test from 'tape';
import { shallow } from 'enzyme';

import PageVisibility from '../index';
import { visibility, getVisibilityState }  from '../visibility';

const Child = props => {
    const { documentHidden, visibilityState } = props;
    return <div>
        <p>{documentHidden ? 'hidden' : 'shown'}</p>
        <p>{visibilityState}</p>
    </div>;
};

test('PageVisibility component', t => {
    t.test('render the component', t => {
        t.plan(1);
        const result = shallow(<PageVisibility />);
        t.equal(result.length, 1);
    });

    t.test('correctly renders direct child', t => {
        t.plan(2);
        const result = shallow(
            <PageVisibility>
                <div>Only 1</div>
            </PageVisibility>
        );
        t.equal(result.length, 1);
        t.equal(result.find('div').length, 1);
    });

    t.test('correctly renders nested children', t => {
        t.plan(2);
        const result = shallow(
            <PageVisibility>
                <div>
                    <p>Multiple ps</p>
                    <p>Multiple ps</p>
                </div>
            </PageVisibility>
        );
        t.equal(result.find('div').length, 1);
        t.equal(result.find('div').find('p').length, 2);
    });

    t.test('throw if trying to render multiple direct children', t => {
        t.plan(1);
        t.throws(() => shallow(
            <PageVisibility>
                <div />
                <div />
            </PageVisibility>
        ), /Invariant Violation/);
    });

    t.test('render props in child', t => {
        t.plan(2);
        const result = shallow(
            <PageVisibility>
                <Child />
            </PageVisibility>
        );
        const child = result.find(Child);
        const state = getVisibilityState(visibility);
        const hidden = state.documentHidden ? 'hidden' : 'shown';
        t.equal(child.length, 1, 'child should exist');
        t.equal(child.html(),
                `<div><p>${hidden}</p><p>${state.visibilityState}</p></div>`,
                'child dom should be equal');
    });
});
