import React from 'react';
import PropTypes from 'prop-types';

const hasDocument = typeof document !== 'undefined';
const vendorEvents = [
    {
        hidden: 'hidden',
        event: 'visibilitychange',
        state: 'visibilityState',
    },
    {
        hidden: 'webkitHidden',
        event: 'webkitvisibilitychange',
        state: 'webkitVisibilityState',
    },
    {
        hidden: 'mozHidden',
        event: 'mozvisibilitychange',
        state: 'mozVisibilityState',
    },
    {
        hidden: 'msHidden',
        event: 'msvisibilitychange',
        state: 'msVisibilityState',
    },
    {
        hidden: 'oHidden',
        event: 'ovisibilitychange',
        state: 'oVisibilityState',
    },
];

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

const getHandlerArgs = () => {
    const { hidden, state } = visibility;
    return [!document[hidden], document[state]];
};

class PageVisibility extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSupported: isSupported && visibility,
        };
    }

    componentDidMount() {
        if (!this.state.isSupported) {
            return;
        }

        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
        document.addEventListener(visibility.event, this.handleVisibilityChange);
    }

    componentWillUnmount() {
        if (!this.state.isSupported) {
            return;
        }
        document.removeEventListener(visibility.event, this.handleVisibilityChange);
    }

    handleVisibilityChange() {
        if (typeof this.props.onChange === 'function') {
            // propagate change to callback
            this.props.onChange(...getHandlerArgs());
        }
        if (typeof this.props.children === 'function') {
            // we pass the props directly to the function as children
            this.forceUpdate();
        }
    }

    render() {
        if (!this.props.children) {
            return null;
        }
        // function as children pattern support
        if (typeof this.props.children === 'function') {
            if (!this.state.isSupported) {
                // don't pass any arguments if PageVisibility is not supported
                return this.props.children();
            }
            return this.props.children(...getHandlerArgs());
        }

        return React.Children.only(this.props.children);
    }
}

PageVisibility.displayName = 'PageVisibility';

PageVisibility.propTypes = {
    onChange: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

export default PageVisibility;
