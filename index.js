import React from 'react';

const hasDocument = typeof document !== 'undefined';
const isSupported = hasDocument && Boolean(document.addEventListener);

const vendorEvents = [{
    hidden: 'hidden',
    event: 'visibilitychange',
    state: 'visibilityState'
}, {
    hidden: 'webkitHidden',
    event: 'webkitvisibilitychange',
    state: 'webkitVisibilityState'
}, {
    hidden: 'mozHidden',
    event: 'mozvisibilitychange',
    state: 'mozVisibilityState'
}, {
    hidden: 'msHidden',
    event: 'msvisibilitychange',
    state: 'msVisibilityState'
}, {
    hidden: 'oHidden',
    event: 'ovisibilitychange',
    state: 'oVisibilityState'
}];

const visibility = (() => {
    if (!isSupported) {
        return null;
    }
    for (let i = 0; i < vendorEvents.length; i++) {
        const event = vendorEvents[i];
        if (event.hidden in document) {
            return event;
        }
    }
    // otherwise it's not supported
    return null;
})();

export default React.createClass({
    displayName: 'PageVisibility',
    getInitialState() {
        return {
            documentHidden: false,
            visibilityState: 'visible'
        };
    },
    componentWillMount() {
        if (!isSupported || !visibility) {
            return;
        }
        this.isListening = true;
        document.addEventListener(visibility.event, this.handleVisibilityChange);
    },
    componentWillUnmount() {
        if (!this.isListening) {
            return;
        }
        document.removeEventListener(visibility.event, this.handleVisibilityChange);
    },
    handleVisibilityChange() {
        const { hidden, state } = visibility;
        this.setState({
            visibilityState: document[state],
            documentHidden: document[hidden]
        });
    },
    render() {
        if (!this.props.children) {
            return null;
        }
        var children = React.Children.only(this.props.children);
        return React.cloneElement(children, this.state);
    }
});
