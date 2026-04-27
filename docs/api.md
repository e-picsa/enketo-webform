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
| `handleEventDataUpdate`    | private |             | `e: CustomEvent<{ nodes: string[] }>`              |          |                |
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

| Kind                        | Name             | Declaration   | Module                   | Package |
| --------------------------- | ---------------- | ------------- | ------------------------ | ------- |
| `js`                        | `EnketoWebform`  | EnketoWebform | ../src/enketo-webform.ts |         |
| `custom-element-definition` | `enketo-webform` | EnketoWebform | ../src/enketo-webform.ts |         |

## `src/kobo-service.ts`:

### Exports

| Kind | Name          | Declaration | Module                 | Package |
| ---- | ------------- | ----------- | ---------------------- | ------- |
| `js` | `KoboService` | KoboService | ../src/kobo-service.ts |         |

## `src/utils.ts`:

### Functions

| Name                    | Description                                              | Parameters                               | Return |
| ----------------------- | -------------------------------------------------------- | ---------------------------------------- | ------ |
| `xmlToJson`             | Converts an XML string to a JSON object.                 | `xmlString: string, options: X2jOptions` |        |
| `jsonToXML`             | Converts a JSON object to an XML string.                 | `json: Record<string, unknown>`          |        |
| `xmlStringToFile`       | Creates a File object from an XML string (browser only). | `xmlString: string`                      |        |
| `xmlNodeReplaceContent` | Replaces the content of a specific XML node.             | `options: {                              |

xml: string;
tagname: string;
content: string;
}, options.xml, options.tagname, options.content` | |

<hr/>

### Exports

| Kind | Name                    | Declaration           | Module          | Package |
| ---- | ----------------------- | --------------------- | --------------- | ------- |
| `js` | `xmlToJson`             | xmlToJson             | ../src/utils.ts |         |
| `js` | `jsonToXML`             | jsonToXML             | ../src/utils.ts |         |
| `js` | `xmlStringToFile`       | xmlStringToFile       | ../src/utils.ts |         |
| `js` | `xmlNodeReplaceContent` | xmlNodeReplaceContent | ../src/utils.ts |         |

## `src/libs/enketo/config.ts`:

### Exports

| Kind | Name      | Declaration | Module                       | Package |
| ---- | --------- | ----------- | ---------------------------- | ------- |
| `js` | `default` |             | ../src/libs/enketo/config.ts |         |

## `src/libs/openrosa/date-extensions.ts`:

### Functions

| Name                      | Description                                                                                                                                                         | Parameters   | Return   |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | -------- |
| `toISOLocalString`        | Converts a native Date UTC String to a RFC 3339-compliant date string with local offsets&#xA;used in ODK, so it replaces the Z in the ISOstring with a local offset | `date: Date` | `string` |
| `getTimezoneOffsetAsTime` |                                                                                                                                                                     | `date: Date` | `string` |

<hr/>

### Exports

| Kind | Name                      | Declaration             | Module                                  | Package |
| ---- | ------------------------- | ----------------------- | --------------------------------------- | ------- |
| `js` | `BlankDate`               | BlankDate               | ../src/libs/openrosa/date-extensions.ts |         |
| `js` | `toISOLocalString`        | toISOLocalString        | ../src/libs/openrosa/date-extensions.ts |         |
| `js` | `getTimezoneOffsetAsTime` | getTimezoneOffsetAsTime | ../src/libs/openrosa/date-extensions.ts |         |

## `src/libs/openrosa/digest.ts`:

### Exports

| Kind | Name      | Declaration | Module                         | Package |
| ---- | --------- | ----------- | ------------------------------ | ------- |
| `js` | `default` |             | ../src/libs/openrosa/digest.ts |         |

## `src/libs/openrosa/extended-xpath.ts`:

### Functions

| Name | Description | Parameters            | Return |
| ---- | ----------- | --------------------- | ------ |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             | `wrapped, extensions` |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |
|      |             |                       |        |

<hr/>

### Exports

| Kind | Name      | Declaration | Module                                 | Package |
| ---- | --------- | ----------- | -------------------------------------- | ------- |
| `js` | `default` |             | ../src/libs/openrosa/extended-xpath.ts |         |

## `src/libs/openrosa/geo.ts`:

### Functions

| Name          | Description                                                                                                                        | Parameters       | Return |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------ |
| `area`        | Adapted from https\://github.com/Leaflet/Leaflet.draw/blob/3cba37065ea5be28f42efe9cc47836c9e3f5db8c/src/ext/GeometryUtil.js#L3-L20 | `geopoints`      |        |
| `distance`    |                                                                                                                                    | `geopoints: any` |        |
| `asGeopoints` |                                                                                                                                    | `r`              |        |

<hr/>

### Exports

| Kind | Name          | Declaration | Module                      | Package |
| ---- | ------------- | ----------- | --------------------------- | ------- |
| `js` | `asGeopoints` | asGeopoints | ../src/libs/openrosa/geo.ts |         |
| `js` | `area`        | area        | ../src/libs/openrosa/geo.ts |         |
| `js` | `distance`    | distance    | ../src/libs/openrosa/geo.ts |         |

## `src/libs/openrosa/openrosa-extensions.ts`:

### Variables

| Name                        | Description | Type |
| --------------------------- | ----------- | ---- |
| `openrosa_xpath_extensions` |             |      |

<hr/>

### Exports

| Kind | Name      | Declaration               | Module                                      | Package |
| ---- | --------- | ------------------------- | ------------------------------------------- | ------- |
| `js` | `default` | openrosa_xpath_extensions | ../src/libs/openrosa/openrosa-extensions.ts |         |

## `src/libs/openrosa/openrosa-xpath.ts`:

### Exports

| Kind | Name      | Declaration | Module                                 | Package |
| ---- | --------- | ----------- | -------------------------------------- | ------- |
| `js` | `default` |             | ../src/libs/openrosa/openrosa-xpath.ts |         |

## `src/libs/openrosa/random-token.ts`:

### Functions

| Name          | Description | Parameters | Return |
| ------------- | ----------- | ---------- | ------ |
| `randomToken` |             | `length`   |        |

<hr/>

### Exports

| Kind | Name          | Declaration | Module                               | Package |
| ---- | ------------- | ----------- | ------------------------------------ | ------- |
| `js` | `randomToken` | randomToken | ../src/libs/openrosa/random-token.ts |         |

## `src/libs/openrosa/xpr.ts`:

### Exports

| Kind | Name      | Declaration | Module                      | Package |
| ---- | --------- | ----------- | --------------------------- | ------- |
| `js` | `default` |             | ../src/libs/openrosa/xpr.ts |         |

## `src/libs/enketo/js/dom-utils.ts`:

### Variables

| Name               | Description                                                                                                                                                                                                                                                                                                                                                            | Type     |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `elementDataStore` | Adapted from https\://stackoverflow\.com/a/46522991/3071529&#xA;&#xA;A storage solution aimed at replacing jQuerys data function.&#xA;Implementation Note: Elements are stored in a (WeakMap)\[https\://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap].&#xA;This makes sure the data is garbage collected when the node is removed. | `object` |

<hr/>

### Functions

| Name                                   | Description                                                                                 | Parameters                                                      | Return        |
| -------------------------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ------------- |
| `getSiblingElementsAndSelf`            | Gets siblings that match selector and self \_in DOM order\_.                                | `element: Node, selector: string`                               | `Array<Node>` |
| `getSiblingElements`                   | Gets siblings that match selector \_in DOM order\_.                                         | `element: Node, selector: string`                               | `Array<Node>` |
| `getSiblingElement`                    | Returns first sibling element (in DOM order) that optionally matches the provided selector. | `element: Node, selector: string`                               | `Node`        |
| `getAncestors`                         | Gets ancestors that match selector \_in DOM order\_.                                        | `element: Node, filterSelector: string, endSelector: string`    | `Array<Node>` |
| `closestAncestorUntil`                 | Gets closest ancestor that match selector until the end selector.                           | `element: Node, filterSelector: string, endSelector: string`    | `Node`        |
| `getChildren`                          | Gets child elements, that (optionally) match a selector.                                    | `element: Node, selector: string`                               | `Array<Node>` |
| `getChild`                             | Gets first child element, that (optionally) matches a selector.                             | `element: Node, selector: string`                               | `Node`        |
| `empty`                                | Removes all children elements.                                                              | `element: Node`                                                 | `undefined`   |
| `hasPreviousSiblingElementSameName`    |                                                                                             | `el: Element`                                                   | `boolean`     |
| `hasNextSiblingElementSameName`        |                                                                                             | `el: Element`                                                   | `boolean`     |
| `hasSiblingElementSameName`            |                                                                                             | `el: Element`                                                   | `boolean`     |
| `hasPreviousCommentSiblingWithContent` |                                                                                             | `node: Element, content: string`                                | `boolean`     |
| `getXPath`                             | Creates an XPath from a node                                                                | `node: Element, rootNodeName: string, includePosition: boolean` | `string`      |
| `getRepeatIndex`                       | Obtains the index of a repeat instance within its own series.                               | `node: Element`                                                 | `number`      |

<hr/>

### Exports

| Kind | Name                                   | Declaration                          | Module                             | Package |
| ---- | -------------------------------------- | ------------------------------------ | ---------------------------------- | ------- |
| `js` | `elementDataStore`                     | elementDataStore                     | ../src/libs/enketo/js/dom-utils.ts |         |
| `js` | `getSiblingElementsAndSelf`            | getSiblingElementsAndSelf            | ../src/libs/enketo/js/dom-utils.ts |         |
| `js` | `getSiblingElements`                   | getSiblingElements                   | ../src/libs/enketo/js/dom-utils.ts |         |
| `js` | `getSiblingElement`                    | getSiblingElement                    | ../src/libs/enketo/js/dom-utils.ts |         |
| `js` | `getAncestors`                         | getAncestors                         | ../src/libs/enketo/js/dom-utils.ts |         |
| `js` | `getChildren`                          | getChildren                          | ../src/libs/enketo/js/dom-utils.ts |         |
| `js` | `getChild`                             | getChild                             | ../src/libs/enketo/js/dom-utils.ts |         |
| `js` | `getRepeatIndex`                       | getRepeatIndex                       | ../src/libs/enketo/js/dom-utils.ts |         |
| `js` | `getXPath`                             | getXPath                             | ../src/libs/enketo/js/dom-utils.ts |         |
| `js` | `hasPreviousCommentSiblingWithContent` | hasPreviousCommentSiblingWithContent | ../src/libs/enketo/js/dom-utils.ts |         |
| `js` | `hasPreviousSiblingElementSameName`    | hasPreviousSiblingElementSameName    | ../src/libs/enketo/js/dom-utils.ts |         |
| `js` | `hasNextSiblingElementSameName`        | hasNextSiblingElementSameName        | ../src/libs/enketo/js/dom-utils.ts |         |
| `js` | `hasSiblingElementSameName`            | hasSiblingElementSameName            | ../src/libs/enketo/js/dom-utils.ts |         |
| `js` | `closestAncestorUntil`                 | closestAncestorUntil                 | ../src/libs/enketo/js/dom-utils.ts |         |
| `js` | `empty`                                | empty                                | ../src/libs/enketo/js/dom-utils.ts |         |
| `js` | `MutationsTracker`                     | MutationsTracker                     | ../src/libs/enketo/js/dom-utils.ts |         |

## `src/libs/enketo/js/event.ts`:

### Exports

| Kind | Name      | Declaration | Module                         | Package |
| ---- | --------- | ----------- | ------------------------------ | ------- |
| `js` | `default` |             | ../src/libs/enketo/js/event.ts |         |

## `src/libs/enketo/js/form.ts`:

### Exports

| Kind | Name        | Declaration | Module                        | Package |
| ---- | ----------- | ----------- | ----------------------------- | ------- |
| `js` | `Form`      | Form        | ../src/libs/enketo/js/form.ts |         |
| `js` | `FormModel` | FormModel   | ../src/libs/enketo/js/form.ts |         |

## `src/libs/enketo/js/page.ts`:

### Exports

| Kind | Name      | Declaration | Module                        | Package |
| ---- | --------- | ----------- | ----------------------------- | ------- |
| `js` | `default` |             | ../src/libs/enketo/js/page.ts |         |

## `src/libs/enketo/js/widget.ts`:

### Exports

| Kind | Name      | Declaration | Module                          | Package |
| ---- | --------- | ----------- | ------------------------------- | ------- |
| `js` | `default` | Widget      | ../src/libs/enketo/js/widget.ts |         |

## `src/libs/enketo/js/widgets.ts`:

### Exports

| Kind | Name      | Declaration | Module                           | Package |
| ---- | --------- | ----------- | -------------------------------- | ------- |
| `js` | `default` |             | ../src/libs/enketo/js/widgets.ts |         |

## `src/libs/enketo/js/xpath-evaluator-binding.ts`:

### Functions

| Name | Description | Parameters | Return |
| ---- | ----------- | ---------- | ------ |
|      |             |            |        |
|      |             |            |        |

<hr/>

### Exports

| Kind | Name      | Declaration | Module                                           | Package |
| ---- | --------- | ----------- | ------------------------------------------------ | ------- |
| `js` | `default` |             | ../src/libs/enketo/js/xpath-evaluator-binding.ts |         |

## `src/libs/openrosa/utils/date.ts`:

### Variables

| Name          | Description              | Type |
| ------------- | ------------------------ | ---- |
| `DATE_STRING` |                          |      |
| `isValidDate` | Check if a date is valid |      |

<hr/>

### Functions

| Name               | Description | Parameters | Return |
| ------------------ | ----------- | ---------- | ------ |
| `dateToDays`       |             | `d`        |        |
| `dateStringToDays` |             | `d`        |        |

<hr/>

### Exports

| Kind | Name               | Declaration      | Module                             | Package |
| ---- | ------------------ | ---------------- | ---------------------------------- | ------- |
| `js` | `DATE_STRING`      | DATE_STRING      | ../src/libs/openrosa/utils/date.ts |         |
| `js` | `dateToDays`       | dateToDays       | ../src/libs/openrosa/utils/date.ts |         |
| `js` | `dateStringToDays` | dateStringToDays | ../src/libs/openrosa/utils/date.ts |         |
| `js` | `isValidDate`      | isValidDate      | ../src/libs/openrosa/utils/date.ts |         |

## `src/libs/openrosa/utils/native.ts`:

### Functions

| Name                   | Description | Parameters   | Return |
| ---------------------- | ----------- | ------------ | ------ |
| `preprocessNativeArgs` |             | `name, args` |        |

<hr/>

### Exports

| Kind | Name                   | Declaration          | Module                               | Package |
| ---- | ---------------------- | -------------------- | ------------------------------------ | ------- |
| `js` | `preprocessNativeArgs` | preprocessNativeArgs | ../src/libs/openrosa/utils/native.ts |         |

## `src/libs/openrosa/utils/operation.ts`:

### Functions

| Name              | Description | Parameters     | Return |
| ----------------- | ----------- | -------------- | ------ |
| `handleOperation` |             | `lhs, op, rhs` |        |

<hr/>

### Exports

| Kind | Name              | Declaration     | Module                                  | Package |
| ---- | ----------------- | --------------- | --------------------------------------- | ------- |
| `js` | `handleOperation` | handleOperation | ../src/libs/openrosa/utils/operation.ts |         |

## `src/libs/openrosa/utils/result.ts`:

### Functions

| Name               | Description | Parameters                    | Return |
| ------------------ | ----------- | ----------------------------- | ------ |
| `toSnapshotResult` |             | `arr, resultType, singleItem` |        |

<hr/>

### Exports

| Kind | Name               | Declaration      | Module                               | Package |
| ---- | ------------------ | ---------------- | ------------------------------------ | ------- |
| `js` | `toSnapshotResult` | toSnapshotResult | ../src/libs/openrosa/utils/result.ts |         |

## `src/libs/openrosa/utils/shuffle.ts`:

### Functions

| Name      | Description                                                          | Parameters                   | Return |
| --------- | -------------------------------------------------------------------- | ---------------------------- | ------ |
| `shuffle` | Performs the "inside-out" variant of the Fisher-Yates array shuffle. | `array, seed: number=, : <*` | `<*`   |

<hr/>

### Exports

| Kind | Name      | Declaration | Module                                | Package |
| ---- | --------- | ----------- | ------------------------------------- | ------- |
| `js` | `default` | shuffle     | ../src/libs/openrosa/utils/shuffle.ts |         |

## `src/libs/openrosa/utils/sort-by-document-order.ts`:

### Functions

| Name | Description | Parameters | Return |
| ---- | ----------- | ---------- | ------ |
|      |             | `ir`       |        |
|      |             |            |        |

<hr/>

### Exports

| Kind | Name      | Declaration | Module                                               | Package |
| ---- | --------- | ----------- | ---------------------------------------------------- | ------- |
| `js` | `default` |             | ../src/libs/openrosa/utils/sort-by-document-order.ts |         |

## `src/libs/openrosa/utils/xpath-cast.ts`:

### Functions

| Name        | Description | Parameters | Return |
| ----------- | ----------- | ---------- | ------ |
| `asBoolean` |             | `r`        |        |
| `asNumber`  |             | `r`        |        |
| `asString`  |             | `r`        |        |

<hr/>

### Exports

| Kind | Name        | Declaration | Module                                   | Package |
| ---- | ----------- | ----------- | ---------------------------------------- | ------- |
| `js` | `asBoolean` | asBoolean   | ../src/libs/openrosa/utils/xpath-cast.ts |         |
| `js` | `asNumber`  | asNumber    | ../src/libs/openrosa/utils/xpath-cast.ts |         |
| `js` | `asString`  | asString    | ../src/libs/openrosa/utils/xpath-cast.ts |         |
