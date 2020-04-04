import { useEffect, useState } from 'react';

import { getHandlerArgs, isSupported, visibility } from './utils';

const isSupportedLocal = isSupported && visibility;

const usePageVisibility = () => {
    const [initiallyVisible] = getHandlerArgs();

    const [isVisible, setIsVisible] = useState(initiallyVisible);

    useEffect(() => {
        if (isSupportedLocal) {
            const handler = () => {
                const [currentlyVisible] = getHandlerArgs();

                setIsVisible(currentlyVisible);
            };

            document.addEventListener(visibility.event, handler);

            return () => {
                document.removeEventListener(visibility.event, handler);
            };
        }
    }, []);

    return isVisible;
};

export default usePageVisibility;
