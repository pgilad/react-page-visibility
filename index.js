import React from 'react';

import { isSupported, visibility } from './visibility';

export default React.createClass({
    displayName: 'PageVisibility',
    propTypes: {
        onChange: React.PropTypes.func.isRequired,
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
        const { onChange } = this.props;
        const { hidden, state } = visibility;

        onChange(document[state], document[hidden]);
    },
    render() {
        if (!this.props.children) {
            return null;
        }
        const child = React.Children.only(this.props.children);
        return React.cloneElement(child);
    }
});
