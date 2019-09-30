import { useEffect } from 'react';

import { getHandlerArgs, isSupported, visibility } from './utils';

const isSupportedLocal = isSupported && visibility;

function useCallbackOnVisibilityChange(onVisibilityChange) {
    useEffect(() => {
        if (isSupportedLocal) {
            const handler = () => {
                onVisibilityChange(...getHandlerArgs());
            };

            document.addEventListener(visibility.event, handler);

            return () => {
                document.removeEventListener(visibility.event, handler);
            };
        }
    }, [onVisibilityChange]);
}

export default useCallbackOnVisibilityChange;
