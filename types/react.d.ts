import type { EnketoWebform } from "../dist/enketo-webform.js";

/**
 * This type can be used to create scoped tags for your components.
 *
 * Usage:
 *
 * ```ts
 * import type { ScopedElements } from "path/to/library/jsx-integration";
 *
 * declare module "my-library" {
 *   namespace JSX {
 *     interface IntrinsicElements
 *       extends ScopedElements<'test-', ''> {}
 *   }
 * }
 * ```
 *
 * @deprecated Runtime scoped elements result in duplicate types and can confusing for developers. It is recommended to use the `prefix` and `suffix` options to generate new types instead.
 */
export type ScopedElements<
  Prefix extends string = "",
  Suffix extends string = "",
> = {
  [Key in keyof CustomElements as `${Prefix}${Key}${Suffix}`]: CustomElements[Key];
};

type BaseProps<T extends HTMLElement> = {
  /** Content added between the opening and closing tags of the element */
  children?: any;
  /** Used for declaratively styling one or more elements using CSS (Cascading Stylesheets) */
  class?: string;
  /** Used for declaratively styling one or more elements using CSS (Cascading Stylesheets) */
  className?: string;
  /** Takes an object where the key is the class name(s) and the value is a boolean expression. When true, the class is applied, and when false, it is removed. */
  classList?: Record<string, boolean | undefined>;
  /** Specifies the text direction of the element. */
  dir?: "ltr" | "rtl";
  /** Contains a space-separated list of the part names of the element that should be exposed on the host element. */
  exportparts?: string;
  /** For <label> and <output>, lets you associate the label with some control. */
  htmlFor?: string;
  /** Specifies whether the element should be hidden. */
  hidden?: boolean | string;
  /** A unique identifier for the element. */
  id?: string;
  /** Keys tell React which array item each component corresponds to */
  key?: string | number;
  /** Specifies the language of the element. */
  lang?: string;
  /** Contains a space-separated list of the part names of the element. Part names allows CSS to select and style specific elements in a shadow tree via the ::part pseudo-element. */
  part?: string;
  /** Use the ref attribute with a variable to assign a DOM element to the variable once the element is rendered. */
  ref?: T | ((e: T) => void);
  /** Adds a reference for a custom element slot */
  slot?: string;
  /** Prop for setting inline styles */
  style?: Record<string, string | number>;
  /** Overrides the default Tab button behavior. Avoid using values other than -1 and 0. */
  tabIndex?: number;
  /** Specifies the tooltip text for the element. */
  title?: string;
  /** Passing 'no' excludes the element content from being translated. */
  translate?: "yes" | "no";
  /** The popover global attribute is used to designate an element as a popover element. */
  popover?: "auto" | "hint" | "manual";
  /** Turns an element element into a popover control button; takes the ID of the popover element to control as its value. */
  popovertarget?: "top" | "bottom" | "left" | "right" | "auto";
  /** Specifies the action to be performed on a popover element being controlled by a control element. */
  popovertargetaction?: "show" | "hide" | "toggle";
};

type BaseEvents = {};

export type EnketoWebformProps = {
  /** XHTML form definition (required) */
  form?: EnketoWebform["form"];
  /** XML data model (required) */
  model?: EnketoWebform["model"];
  /** Whether to show Save Draft / Submit buttons */
  showButtons?: EnketoWebform["showButtons"];
  /** Unique identifier for the form definition (enketo ID)
If not provided, will be extracted from the form or generated */
  enketoId?: EnketoWebform["enketoId"];
  /** Name for the form entry */
  formName?: EnketoWebform["formName"];
  /** Unique identifier for the form instance
If not provided, will be generated on first save */
  instanceId?: EnketoWebform["instanceId"];

  /**  */
  onformSaved?: (e: CustomEvent) => void;
  /**  */
  ondataUpdated?: (e: CustomEvent) => void;
};

export type EnketoWebformSolidJsProps = {
  /** XHTML form definition (required) */
  "prop:form"?: EnketoWebform["form"];
  /** XML data model (required) */
  "prop:model"?: EnketoWebform["model"];
  /** Whether to show Save Draft / Submit buttons */
  "prop:showButtons"?: EnketoWebform["showButtons"];
  /** Unique identifier for the form definition (enketo ID)
If not provided, will be extracted from the form or generated */
  "prop:enketoId"?: EnketoWebform["enketoId"];
  /** Name for the form entry */
  "prop:formName"?: EnketoWebform["formName"];
  /** Unique identifier for the form instance
If not provided, will be generated on first save */
  "prop:instanceId"?: EnketoWebform["instanceId"];
  /**  */
  "on:formSaved"?: (e: CustomEvent) => void;
  /**  */
  "on:dataUpdated"?: (e: CustomEvent) => void;

  /** Set the innerHTML of the element */
  innerHTML?: string;
  /** Set the textContent of the element */
  textContent?: string | number;
};

export type CustomElements = {
  /**
   *
   *
   * ## Attributes & Properties
   *
   * Component attributes and properties that can be applied to the element or by using JavaScript.
   *
   * - `form`: XHTML form definition (required)
   * - `model`: XML data model (required)
   * - `showButtons`: Whether to show Save Draft / Submit buttons
   * - `enketoId`: Unique identifier for the form definition (enketo ID)
   * If not provided, will be extracted from the form or generated
   * - `formName`: Name for the form entry
   * - `instanceId`: Unique identifier for the form instance
   * If not provided, will be generated on first save
   *
   * ## Events
   *
   * Events that will be emitted by the component.
   *
   * - `formSaved`: undefined
   * - `dataUpdated`: undefined
   */
  "enketo-webform": Partial<
    EnketoWebformProps & BaseProps<EnketoWebform> & BaseEvents
  >;
};

export type CustomElementsSolidJs = {
  /**
   *
   *
   * ## Attributes & Properties
   *
   * Component attributes and properties that can be applied to the element or by using JavaScript.
   *
   * - `form`: XHTML form definition (required)
   * - `model`: XML data model (required)
   * - `showButtons`: Whether to show Save Draft / Submit buttons
   * - `enketoId`: Unique identifier for the form definition (enketo ID)
   * If not provided, will be extracted from the form or generated
   * - `formName`: Name for the form entry
   * - `instanceId`: Unique identifier for the form instance
   * If not provided, will be generated on first save
   *
   * ## Events
   *
   * Events that will be emitted by the component.
   *
   * - `formSaved`: undefined
   * - `dataUpdated`: undefined
   */
  "enketo-webform": Partial<
    EnketoWebformProps &
      EnketoWebformSolidJsProps &
      BaseProps<EnketoWebform> &
      BaseEvents
  >;
};

export type CustomCssProperties = {};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements extends CustomElements {}
  }
  export interface CSSProperties extends CustomCssProperties {}
}

declare module "preact" {
  namespace JSX {
    interface IntrinsicElements extends CustomElements {}
  }
  export interface CSSProperties extends CustomCssProperties {}
}

declare module "@builder.io/qwik" {
  namespace JSX {
    interface IntrinsicElements extends CustomElements {}
  }
  export interface CSSProperties extends CustomCssProperties {}
}

declare module "@stencil/core" {
  namespace JSX {
    interface IntrinsicElements extends CustomElements {}
  }
  export interface CSSProperties extends CustomCssProperties {}
}

declare module "hono/jsx" {
  namespace JSX {
    interface IntrinsicElements extends CustomElements {}
  }
  export interface CSSProperties extends CustomCssProperties {}
}

declare module "react-native" {
  namespace JSX {
    interface IntrinsicElements extends CustomElements {}
  }
  export interface CSSProperties extends CustomCssProperties {}
}

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements extends CustomElementsSolidJs {}
  }
  export interface CSSProperties extends CustomCssProperties {}
}

declare global {
  namespace JSX {
    interface IntrinsicElements extends CustomElements {}
  }
  export interface CSSProperties extends CustomCssProperties {}
}
