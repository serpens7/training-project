declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
}

declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';

declare module '*.svg' {
    import React from 'react';
    const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}


declare const __IS_DEV__: boolean;