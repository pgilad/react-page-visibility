import * as React from 'react';

export function usePageVisibility(): boolean;

interface Props { onChange?: (isVisible: boolean) => void }

declare class PageVisibility extends React.Component<Props, any> { }

export default PageVisibility;
