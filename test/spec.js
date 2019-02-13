import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import test from 'tape';

import PageVisibility from '../src/index';

const noop = function() {};

const Child = props => {
    const { documentHidden, visibilityState } = props;
    return (
        <div>
            <p>{documentHidden ? 'hidden' : 'shown'}</p>
            <p>{visibilityState}</p>
        </div>
    );
};

test('render the component', t => {
    const result = shallow(<PageVisibility onChange={noop} />);
    t.equal(result.length, 1);
    t.end();
});

test('throw if trying to render multiple direct children', t => {
    t.throws(
        () =>
            shallow(
                <PageVisibility onChange={noop}>
                    <div />
                    <div />
                </PageVisibility>
            ),
        /Invariant Violation/
    );
    t.end();
});

test('throw if trying to render multiple custom direct children', t => {
    t.throws(
        () =>
            shallow(
                <PageVisibility onChange={noop}>
                    <Child />
                    <Child />
                </PageVisibility>
            ),
        /Invariant Violation/
    );
    t.end();
});

test('allow children as function', t => {
    const stub = sinon.stub();
    const wrapper = shallow(<PageVisibility>{stub}</PageVisibility>);

    t.equal(wrapper.length, 1);
    t.equal(stub.callCount, 1);
    t.equal(stub.firstCall.args.length, 2);
    t.looseEquals(stub.firstCall.args, [false, 'prerender']);

    t.end();
});
