declare module "jquery" {
  const $: any;
  export default $;
}

declare module "jquery-touchswipe";

declare module "*.ts" {
  const content: any;
  export default content;
}

declare module "*.js" {
  const content: any;
  export default content;
}

interface ImportMetaEnv {
  readonly DEV: boolean;
  readonly PROD: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
