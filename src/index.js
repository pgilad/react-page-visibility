import React, { Component } from 'react';
import PropTypes from 'prop-types';

const hasDocument = typeof document !== 'undefined';
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

export const isSupported = hasDocument && Boolean(document.addEventListener);

export const visibility = (() => {
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

export const getVisibilityState = ({ hidden, state }) => {
    return {
        documentHidden: document[hidden],
        visibilityState: document[state],
    };
};

class PageVisibility extends Component {
    componentWillMount() {
        if (!isSupported || !visibility) {
            return;
        }

        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
        this.isListening = true;

        document.addEventListener(visibility.event, this.handleVisibilityChange);
    }

    componentWillUnmount() {
        if (!this.isListening) {
            return;
        }
        document.removeEventListener(visibility.event, this.handleVisibilityChange);
    }

    handleVisibilityChange() {
        const { hidden, state } = visibility;
        this.props.onChange(document[state], document[hidden]);
    }

    render() {
        if (!this.props.children) {
            return null;
        }

        return React.Children.only(this.props.children);
    }
}

PageVisibility.displayName = 'PageVisibility';

PageVisibility.propTypes = {
    onChange: PropTypes.func.isRequired
};

export default PageVisibility;
