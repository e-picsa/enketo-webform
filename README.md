# Enketo Webform

A web component for rendering XForms using Enketo Core.

## Installation

```bash
npm install @picsa/enketo-webform
```

## Usage

### Basic Usage

```html
<script type="module" src="./enketo-webform.js"></script>
<link rel="stylesheet" href="./enketo-webform.css" />

<enketo-webform
  form="<form xmlns='http://www.w3.org/1999/xhtml'>...</form>"
  model="<model>...</model>"
></enketo-webform>
```

### React Usage

```jsx
import "@picsa/enketo-webform";

function FormComponent({ form, model }) {
  const webformRef = useRef(null);

  useEffect(() => {
    const webform = webformRef.current;
    if (!webform) return;

    const handleDataUpdated = (event) => {
      console.log("Data updated:", event.detail.xml);
    };

    const handleFormSaved = (event) => {
      console.log("Form saved:", event.detail.entry);
    };

    webform.addEventListener("dataUpdated", handleDataUpdated);
    webform.addEventListener("formSaved", handleFormSaved);

    return () => {
      webform.removeEventListener("dataUpdated", handleDataUpdated);
      webform.removeEventListener("formSaved", handleFormSaved);
    };
  }, []);

  return (
    <enketo-webform
      ref={webformRef}
      form={form}
      model={model}
      showButtons={true}
    />
  );
}
```

### Angular Usage

#### Step 1: Import the custom element

Add the custom element import in your `main.ts` (or `app.component.ts`):

```typescript
import "@picsa/enketo-webform";
```

If using standalone components, import in the component file:

```typescript
import "@picsa/enketo-webform";

@Component({
  selector: "app-form",
  standalone: true,
  imports: [],
  templateUrl: "./form.component.html",
})
export class FormComponent implements AfterViewInit {
  @ViewChild("webform") webformEl!: HTMLElement & {
    form?: string;
    model?: string;
  };

  ngAfterViewInit() {
    const webform = this.webformEl;

    webform.addEventListener("dataUpdated", (event: Event) => {
      const { xml, nodes } = (event as CustomEvent).detail;
      console.log("Data updated:", xml);
    });

    webform.addEventListener("formSaved", (event: Event) => {
      const { entry } = (event as CustomEvent).detail;
      console.log("Form saved:", entry);
    });
  }
}
```

#### Step 2: Use in template

```html
<app-form
  #webform
  [form]="formXml"
  [model]="modelXml"
  [showButtons]="true"
></app-form>
```

Or with ngIf to ensure the element is registered:

```typescript
import "@picsa/enketo-webform";

@Component({
  selector: "app-form-wrapper",
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="formXml && modelXml">
      <enketo-webform
        [form]="formXml"
        [model]="modelXml"
        [showButtons]="true"
        (dataUpdated)="onDataUpdated($event)"
        (formSaved)="onFormSaved($event)"
      ></enketo-webform>
    </ng-container>
  `,
})
export class FormWrapperComponent {
  formXml = "<form>...</form>";
  modelXml = "<model>...</model>";

  onDataUpdated(event: CustomEvent) {
    console.log("Data:", event.detail.xml);
  }

  onFormSaved(event: CustomEvent) {
    console.log("Saved:", event.detail.entry);
  }
}
```

#### Angular with NgxCustomElement

For better Angular integration, use `ngx-custom-element`:

```bash
npm install ngx-custom-element
```

```typescript
import { CustomElementModule } from "ngx-custom-element";
import "@picsa/enketo-webform";

@NgModule({
  imports: [CustomElementModule],
  declarations: [FormComponent],
})
export class AppModule {}
```

## API

### `<enketo-webform>` Attributes & Properties

| Name          | Type      | Default  | Description                                 |
| ------------- | --------- | -------- | ------------------------------------------- |
| `form`        | `string`  | required | XHTML form definition (required)            |
| `model`       | `string`  | required | XML data model (required)                   |
| `showButtons` | `boolean` | `true`   | Whether to show Save Draft / Submit buttons |

### Events

#### `dataUpdated`

Dispatched when form data changes.

```typescript
interface IEventDataUpdated {
  detail: {
    xml: string; // Current XML data string
    nodes: string[]; // Array of changed node paths
  };
}
```

```javascript
webform.addEventListener("dataUpdated", (event) => {
  const { xml, nodes } = event.detail;
  console.log("Changed nodes:", nodes);
  console.log("Current data:", xml);
});
```

#### `formSaved`

Dispatched when user clicks "Save Draft" or "Submit" buttons.

```typescript
interface IEnketoFormEntry {
  created: number;
  draft: boolean;
  enketoId: string;
  files: any[];
  instanceId: string;
  name: string;
  updated: number;
  xml: string;
}

interface IEventFormSaved {
  detail: {
    entry: IEnketoFormEntry;
  };
}
```

```javascript
webform.addEventListener('formSaved', (event) => {
  const { entry } = event.detail;
  console.log('Saved entry:', entry);
  // Submit to server:
  await submitToServer(entry.xml);
});
```

## Utility Functions

### `xmlToJson<T>(xmlString: string, options?: X2jOptions): T`

Parses XML string to JSON object.

```typescript
import { xmlToJson } from "@picsa/enketo-webform";

const json = xmlToJson<Record<string, any>>("<root><name>John</name></root>");
console.log(json.root.name); // "John"
```

### `jsonToXML(json: Record<string, any>): string`

Converts JSON object to XML string.

```typescript
import { jsonToXML } from "@picsa/enketo-webform";

const xml = jsonToXML({ root: { name: "John" } });
// <?xml version="1.0" encoding="UTF-8"?><root><name>John</name></root>
```

### `xmlStringToFile(xmlString: string): File`

Creates a File object from XML string (browser only).

```typescript
import { xmlStringToFile } from "@picsa/enketo-webform";

const file = xmlStringToFile("<root><name>John</name></root>");
console.log(file.name); // "submission.xml"
```

### `xmlNodeReplaceContent(options: { xml: string; tagname: string; content: string }): string`

Replaces content of a specific XML node.

```typescript
import { xmlNodeReplaceContent } from "@picsa/enketo-webform";

const updated = xmlNodeReplaceContent({
  xml: "<root><name>John</name></root>",
  tagname: "name",
  content: "Jane",
});
// <root><name>Jane</name></root>
```

## KoboService

Service for submitting forms to KoBoToolbox.

```typescript
import { KoboService } from "@picsa/enketo-webform";

const kobo = new KoboService({ authToken: "your-token" });

const response = await kobo.submitXMLSubmission(xmlData);
console.log(response.status, response.data);
```

### Constructor

```typescript
new KoboService(config: IKoboServiceConfig)
```

### Configuration

```typescript
interface IKoboServiceConfig {
  authToken: string; // KoBoToolbox API token
}
```

### Methods

#### `submitXMLSubmission(xmlSubmission: string): Promise<IHttpResponse>`

Submits XML data to KoBoToolbox API v1.

```typescript
const response = await kobo.submitXMLSubmission(xmlData);
```

### API Endpoints

```typescript
kobo.apiEndpoints.v1; // "https://kc.kobotoolbox.org/api/v1"
kobo.apiEndpoints.v2; // "https://kf.kobotoolbox.org/api/v2"
```

## TypeScript

This package includes TypeScript definitions. Import types directly:

```typescript
import type { IEventDataUpdated, IEventFormSaved } from "@picsa/enketo-webform";
```
