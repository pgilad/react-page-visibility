# React Page Visibility
> Declarative, nested, stateful, isomorphic page visibility for React

## Motivation

Are you polling your Backend on an interval basis? Are you running animations? What do you do if your tab is no longer visible?

See more classic use-cases in [MDN Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API#Use_cases)

Well now you can react (Pun intended) to your app being in the background and invisible by conserving bandwidth and GPU calculations with ease.
Introduction **React Page Visibility**:

- A React higher order component that wraps the page visibility API
- Cross-browser support (Yes, even IE and Safari)
- Safe fallback if browser does not support it
- Lets you decide how to handle the page being invisible and turning visible again

## Installation

```js
$ npm install --save react-page-visibility
```

## Usage

A rotating carousal component that will be passed down a prop of whether to rotate the images
or not based on whether page is visible.

```js
import PageVisibility from 'react-page-visibility';

export default React.createClass({
    getInitialState() {
        return {
            visible: true
        },
    },
    handleVisibilityChange(visibilityState, documentHidden) {
        this.setState({ visible: !documentHidden });
    },
    render() {
        const { visible } = this.state;

        return (
            <PageVisibility onChange={this.handleVisibilityChange}>
                <RotatingCarousel rotate={visible} />
            </PageVisibility>
        );
    },
});
```

## API

`react-page-visibility` is an [HOC](https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e) which **requires** you to pass it an `onChange` function:

`onChange(handler)`

Where `handler` is the callback to run when the `visibilityState` of the document changes:

`Function handler(<String> visibilityState, <Boolean> documentHidden)`

- `visibilityState` is a String and can be one of `visible`, `hidden`, `prerender`, `unloaded` (if your browser supports those)
- `documentHidden` is a Boolean indicating whether document is considered hidden to the user.

See [MDN Properties overview](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API#Properties_overview)

## License

MIT
