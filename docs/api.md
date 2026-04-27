## `src/enketo-webform.ts`:

### class: `EnketoWebform`, `enketo-webform`

#### Superclass

| Name         | Module | Package |
| ------------ | ------ | ------- |
| `LitElement` |        | lit     |

#### Fields

| Name              | Privacy | Type                                        | Default  | Description                                                                                                             | Inherited From |
| ----------------- | ------- | ------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------- | -------------- |
| `form`            |         | `string`                                    |          | XHTML form definition (required)                                                                                        |                |
| `model`           |         | `string`                                    |          | XML data model (required)                                                                                               |                |
| `showButtons`     |         | `boolean`                                   | `true`   | Whether to show Save Draft / Submit buttons                                                                             |                |
| `enketoId`        |         | `string`                                    | `""`     | Unique identifier for the form definition (enketo ID)&#xA;If not provided, will be extracted from the form or generated |                |
| `formName`        |         | `string`                                    | `""`     | Name for the form entry                                                                                                 |                |
| `instanceId`      |         | `string`                                    | `""`     | Unique identifier for the form instance&#xA;If not provided, will be generated on first save                            |                |
| `formContainerEl` | private | `HTMLDivElement`                            |          |                                                                                                                         |                |
| `enketoForm`      | private | `Form \| null`                              | `null`   |                                                                                                                         |                |
| `formHtml`        | private | `string`                                    | `""`     |                                                                                                                         |                |
| `status`          | private | `"idle" \| "loading" \| "ready" \| "error"` | `"idle"` |                                                                                                                         |                |
| `errorMessage`    | private | `string`                                    | `""`     |                                                                                                                         |                |
| `_formLoaded`     | private | `boolean`                                   | `false`  |                                                                                                                         |                |
| `xmlFormValue`    | private | `string`                                    |          |                                                                                                                         |                |

#### Methods

| Name                       | Privacy | Description | Parameters                                         | Return   | Inherited From |
| -------------------------- | ------- | ----------- | -------------------------------------------------- | -------- | -------------- |
| `renderDebugStatus`        | private |             |                                                    |          |                |
| `renderEnketoLogo`         | private |             |                                                    |          |                |
| `renderFooter`             | private |             |                                                    |          |                |
| `generateId`               | private |             | `prefix: string`                                   | `string` |                |
| `save`                     | private |             | `opts`                                             |          |                |
| `handleEventDataUpdate`    | private |             | `e: ReturnType<typeof Events.DataUpdate>`          |          |                |
| `handleEventXmlFormChange` | private |             | `_e: ReturnType<typeof Events.XFormsValueChanged>` |          |                |
| `loadForm`                 | private |             |                                                    |          |                |

#### Events

| Name          | Type          | Description | Inherited From |
| ------------- | ------------- | ----------- | -------------- |
| `formSaved`   | `CustomEvent` |             |                |
| `dataUpdated` | `CustomEvent` |             |                |

#### Attributes

| Name          | Field       | Inherited From |
| ------------- | ----------- | -------------- |
| `form`        | form        |                |
| `model`       | model       |                |
| `showButtons` | showButtons |                |
| `enketoId`    | enketoId    |                |
| `formName`    | formName    |                |
| `instanceId`  | instanceId  |                |

<hr/>

### Variables

| Name         | Description | Type |
| ------------ | ----------- | ---- |
| `enketoId`   |             |      |
| `instanceId` |             |      |
| `name`       |             |      |

<hr/>

### Exports

| Kind                        | Name             | Declaration   | Module                | Package |
| --------------------------- | ---------------- | ------------- | --------------------- | ------- |
| `js`                        | `EnketoWebform`  | EnketoWebform | src/enketo-webform.ts |         |
| `custom-element-definition` | `enketo-webform` | EnketoWebform | src/enketo-webform.ts |         |

## `src/utils.ts`:

### Functions

| Name                    | Description                                              | Parameters                               | Return |
| ----------------------- | -------------------------------------------------------- | ---------------------------------------- | ------ |
| `xmlToJson`             | Converts an XML string to a JSON object.                 | `xmlString: string, options: X2jOptions` |        |
| `jsonToXML`             | Converts a JSON object to an XML string.                 | `json: Record<string, any>`              |        |
| `xmlStringToFile`       | Creates a File object from an XML string (browser only). | `xmlString: string`                      |        |
| `xmlNodeReplaceContent` | Replaces the content of a specific XML node.             | `options: {                              |

xml: string;
tagname: string;
content: string;
}, options.xml, options.tagname, options.content` | |

<hr/>

### Exports

| Kind | Name                    | Declaration           | Module       | Package |
| ---- | ----------------------- | --------------------- | ------------ | ------- |
| `js` | `xmlToJson`             | xmlToJson             | src/utils.ts |         |
| `js` | `jsonToXML`             | jsonToXML             | src/utils.ts |         |
| `js` | `xmlStringToFile`       | xmlStringToFile       | src/utils.ts |         |
| `js` | `xmlNodeReplaceContent` | xmlNodeReplaceContent | src/utils.ts |         |

## `src/kobo-service.ts`:

### class: `KoboService`

#### Fields

| Name           | Privacy | Type     | Default                                                                                                                                                                                      | Description               | Inherited From |
| -------------- | ------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | -------------- |
| `apiEndpoints` | public  | `object` | `{ v1: "https://kc.kobotoolbox.org/api/v1", v2: "https://kf.kobotoolbox.org/api/v2", }`                                                                                                      | KoBoToolbox API endpoints |                |
| `httpHandlers` | public  | `object` | `{ req: (endpoint: string, options: RequestInit) => fetch(endpoint, options).then(async (res) => { const status = res.status; const text = await res.text(); return { status, text }; }), }` | HTTP request handler      |                |

#### Methods

| Name                      | Privacy | Description                             | Parameters                              | Return | Inherited From |
| ------------------------- | ------- | --------------------------------------- | --------------------------------------- | ------ | -------------- |
| `submitXMLSubmission`     | public  | Submits XML data to KoBoToolbox API v1. | `xmlSubmission: string`                 |        |                |
| `formatResponse`          | private |                                         | `status: number, text: string`          |        |                |
| `wipUpdateJSONSubmission` | public  |                                         | `data: Record<string, any>, id: string` |        |                |
| `formatXML`               | private |                                         | `xmlString: string`                     |        |                |

<hr/>

### Exports

| Kind | Name          | Declaration | Module              | Package |
| ---- | ------------- | ----------- | ------------------- | ------- |
| `js` | `KoboService` | KoboService | src/kobo-service.ts |         |
