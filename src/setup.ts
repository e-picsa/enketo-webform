import jQuery from "jquery";

// Force jquery into global window

if (typeof window !== "undefined") {
  (window as any).jQuery = (window as any).$ = jQuery;
  // Shim require for legacy plugins bundled as CJS
  (window as any).require = (name: string) => {
    if (name === "jquery" || name === "jQuery") {
      return jQuery;
    }
    throw new Error(
      `Enketo Webform: require("${name}") is not supported in the browser. All dependencies should be bundled.`,
    );
  };
}

export default jQuery;
