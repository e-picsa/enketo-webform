/**
 * Interface representing a saved form entry
 */
export interface IEnketoFormEntry {
  created: number;
  draft: boolean;
  enketoId: string;
  files: unknown[];
  instanceId: string;
  name: string;
  updated: number;
  xml: string;
}

/**
 * Event detail for formSaved event
 */
export interface IEventFormSaved {
  entry: IEnketoFormEntry;
}

/**
 * Event detail for dataUpdated event
 */
export interface IEventDataUpdated {
  xml: string;
  nodes: string[];
}

// declare module "jquery" {
//   const $: any;
//   export default $;
// }

// declare module "jquery-touchswipe";

// declare module "*.ts" {
//   const content: any;
//   export default content;
// }

// declare module "*.js" {
//   const content: any;
//   export default content;
// }

// interface ImportMetaEnv {
//   readonly DEV: boolean;
//   readonly PROD: boolean;
// }

// interface ImportMeta {
//   readonly env: ImportMetaEnv;
// }
