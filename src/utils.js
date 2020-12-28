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
    for (let event of vendorEvents) {
        if (event.hidden in document) {
            return event;
        }
    }
    // otherwise it's not supported
    return null;
})();

export const getHandlerArgs = () => {
    if (!visibility) {
        return [true, 'visible'];
    }
    const { hidden, state } = visibility;
    return [!document[hidden], document[state]];
};
