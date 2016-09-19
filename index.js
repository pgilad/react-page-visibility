import React from 'react';

import { isSupported, visibility, getVisibilityState } from './visibility';

export default React.createClass({
    displayName: 'PageVisibility',
    getInitialState() {
        if (isSupported && visibility) {
            return getVisibilityState(visibility);
        }
        return {
            documentHidden: null,
            visibilityState: null
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
        const children = React.Children.only(this.props.children);
        return React.cloneElement(children, this.state);
    }
});
