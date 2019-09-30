import PropTypes from 'prop-types';
import React from 'react';

import { getHandlerArgs, isSupported, visibility } from './utils';

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
