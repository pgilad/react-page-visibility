import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { isSupported, visibility } from './visibility';

export default class PageVisibility extends Component {
    componentWillMount() {
        if (!isSupported || !visibility) {
            return;
        }
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
        const { onChange } = this.props;
        const { hidden, state } = visibility;

        onChange(document[state], document[hidden]);
    }

    render() {
        if (!this.props.children) {
            return null;
        }
        const child = React.Children.only(this.props.children);
        return React.cloneElement(child);
    }
}

PageVisibility.displayName = 'PageVisibility';

PageVisibility.PropTypes = {
    onChange: PropTypes.func.isRequired
};
