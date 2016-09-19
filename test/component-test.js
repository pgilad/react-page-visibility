import './setup';

import React from 'react';
import test from 'tape';
import { shallow } from 'enzyme';

import PageVisibility from '../index';
import { visibility, getVisibilityState }  from '../visibility';

const noop = function () {};

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
        const result = shallow(<PageVisibility onChange={noop} />);
        t.equal(result.length, 1);
    });

    t.test('throw if trying to render multiple direct children', t => {
        t.plan(1);
        t.throws(() => shallow(
            <PageVisibility onChange={noop}>
                <div />
                <div />
            </PageVisibility>
        ), /Invariant Violation/);
    });

    t.test('throw if trying to render multiple custom direct children', t => {
        t.plan(1);
        t.throws(() => shallow(
            <PageVisibility onChange={noop}>
                <Child />
                <Child />
            </PageVisibility>
        ), /Invariant Violation/);
    });
});
