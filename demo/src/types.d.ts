import "preact";

import type { CustomElements } from "@picsa/enketo-webform/types/preact";

declare global {
  namespace preact.JSX {
    interface IntrinsicElements extends CustomElements {}
  }
}

export {};
