# React Page Visibility
> Declarative, nested, stateful, isomorphic page visibility for React

[![Build Status](https://travis-ci.org/pgilad/react-page-visibility.svg?branch=master)](https://travis-ci.org/pgilad/react-page-visibility)

## Motivation

Are you polling your Backend on an interval basis? Are you running animations? What do you do if your tab is no longer visible?

See more classic use-cases in [MDN Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API#Use_cases).

Well now you can react (Pun intended) to your app being in the background and invisible by conserving bandwidth and GPU calculations with ease.
Introduction **React Page Visibility**:

- A React [higher order component](https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e) that wraps the page visibility API
- Cross-browser support (Yes, even IE and Safari)
- Safe fallback if browser does not support it
- Can be used multiple times anywhere in your application without side effects
- Lets you decide how to handle the page being invisible and turning visible again

### Why use a React component and not a helper function?

Because React is cool. 'Nuff said.

But really, why not use a helper function?
Because you will then need to `addEventListener` and `removeEventListener` in your component lifecycle and that gets tedious.

Also, every time you use it you will need to check if your user's browser supports it and that gets tedious too.

Instead with `react-page-visibility` everything is taken care of for you.

## Installation

```js
$ npm install --save react-page-visibility
```

## Usage

A rotating carousel component that will be passed down a prop of whether to rotate the images or not based on whether page is visible.

### Using `onChange` callback

```js
import React from 'react';
import PageVisibility from 'react-page-visibility';

class AppContainer extends React.Component {
    state = {
        rotate: true
    };

    handleVisibilityChange = isVisible => {
        this.setState({ rotate: !isVisible });
    }

    render() {
        return (
            <PageVisibility onChange={this.handleVisibilityChange}>
                <RotatingCarousel rotate={this.state.rotate} />
            </PageVisibility>
        );
    }
}
```

## Using `children` as function callback

```js
import React from 'react';
import PageVisibility from 'react-page-visibility';

const AppContainer = () => {
    return (
        <PageVisibility>
            { isVisible => <RotatingCarousel rotate={isVisible} /> }
        </PageVisibility>
    );
}
```

## API

`react-page-visibility` is an higher order component, you can pass to it an `onChange` function:

`onChange(handler)`

Where `handler` is the callback to run when the `visibilityState` of the document changes:

`Function handler(<Boolean> isVisible, <String> visibilityState)`

- `isVisible` is a Boolean indicating whether document is considered visible to the user or not.
- `visibilityState` is a String and can be one of `visible`, `hidden`, `prerender`, `unloaded` (if your browser supports those)

**Notice: previous versions had different arguments in the `handler`**

Or you can use [function as children](https://reactpatterns.com/#function-as-children) pattern,
where `children` is the callback to run when the `visibilityState` of the document changes.

`Function children(<Boolean> isVisible, <String> visibilityState)`

See [MDN Page Visibility API Properties overview](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API#Properties_overview)

## License

MIT © [Gilad Peleg](https://www.giladpeleg.com)
