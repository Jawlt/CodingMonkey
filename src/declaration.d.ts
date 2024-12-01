// src/declarations.d.ts
declare module "*.jsx" {
    const content: any;
    export default content;
}

declare module "*.svg" {
    import React from "react";
    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
  }
  