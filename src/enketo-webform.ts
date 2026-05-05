import "./setup";
import { LitElement, html, nothing, css } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";

import { Form } from "./libs/enketo/js/form";
import Events from "./libs/enketo/js/event";

// Directly import styles globally since we are using Light DOM
import compiledStyles from "./enketo-webform.scss?inline";

import type {
  IEnketoFormEntry,
  IEventDataUpdated,
  IEventFormSaved,
} from "./types";

const DEBUG = import.meta.env?.DEV ?? false;

function debug(...args: unknown[]) {
  if (DEBUG) {
    console.debug("[enketo-webform]", ...args);
  }
}

injectStyles();

function injectStyles() {
  // Ensure styles are a string and inject into head
  // This is because we are using global styles (easier to override)
  const cssString =
    typeof compiledStyles === "string"
      ? compiledStyles
      : // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((compiledStyles as any)?.default ?? "");
  if (
    typeof document !== "undefined" &&
    cssString &&
    !document.getElementById("enketo-webform-styles")
  ) {
    const style = document.createElement("style");
    style.id = "enketo-webform-styles";
    style.textContent = cssString;
    document.head.appendChild(style);
  }
}

@customElement("enketo-webform")
/**
 * Web component for rendering XForms using Enketo Core.
 *
 * @element enketo-webform
 *
 * @fires dataUpdated - Dispatched when form data changes
 * @fires formSaved - Dispatched when user clicks Save Draft or Submit
 */
export class EnketoWebform extends LitElement {
  /**
   * XHTML form definition (required)
   */
  @property({ type: String }) form!: string;

  /**
   * XML data model (required)
   */
  @property({ type: String }) model!: string;

  /**
   * Whether to show Save Draft / Submit buttons
   */
  @property({ type: Boolean }) showButtons = true;

  /**
   * Unique identifier for the form definition (enketo ID)
   * If not provided, will be extracted from the form or generated
   */
  @property({ type: String }) enketoId = "";

  /**
   * Name for the form entry
   */
  @property({ type: String }) formName = "";

  /**
   * Unique identifier for the form instance
   * If not provided, will be generated on first save
   */
  @property({ type: String }) instanceId = "";

  @query("#form-container") private formContainerEl!: HTMLDivElement;

  protected createRenderRoot() {
    return this;
  }

  @state() private enketoForm: Form | null = null;
  @state() private formHtml = "";
  @state() private status: "idle" | "loading" | "ready" | "error" = "idle";
  @state() private errorMessage = "";

  private _formLoaded = false;

  static styles = [
    css`
      :host {
        display: block;
        position: relative;
      }
      .status-indicator {
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 12px;
        margin-bottom: 8px;
      }
      .status-idle {
        background: #e0e0e0;
        color: #666;
      }
      .status-loading {
        background: #fff3cd;
        color: #856404;
      }
      .status-ready {
        background: #d4edda;
        color: #155724;
      }
      .status-error {
        background: #f8d7da;
        color: #721c24;
      }
      #form-unavailable {
        animation: appearDelayed 2s;
        -webkit-animation: appearDelayed 2s;
        -moz-animation: appearDelayed 2s;
        -o-animation: appearDelayed 2s;
        -ms-animation: appearDelayed 2s;
      }
      @keyframes appearDelayed {
        0% {
          opacity: 0;
        }
        90% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
    `,
  ];

  render() {
    if (this.status === "error") {
      return html`
        <div class="status-indicator status-error">
          <strong>Error:</strong> ${this.errorMessage}
        </div>
      `;
    }

    if (!this.form || !this.model) {
      return html`<p data-testid="form-na" id="form-unavailable">
        Form not available
      </p>`;
    }

    return html`
      ${DEBUG ? this.renderDebugStatus() : nothing}
      <div id="form-container"></div>
      ${this.showButtons ? this.renderFooter() : nothing}
    `;
  }

  private renderDebugStatus() {
    const statusText = {
      idle: "Waiting for form/model...",
      loading: "Loading form...",
      ready: "Form loaded",
      error: "Error",
    }[this.status];
    return html`
      <div class="status-indicator status-${this.status}">
        <strong>Status:</strong> ${statusText}
      </div>
    `;
  }

  private renderFooter() {
    return html`
      <section id="form-footer">
        <button
          class="btn btn-default"
          id="save-draft"
          @click="${() => this.save({ draft: true })}"
        >
          <i class="icon icon-pencil"> </i>
          <span data-i18n="formfooter.savedraft.btn">Save Draft</span>
        </button>
        <button
          class="btn btn-primary"
          id="submit-form"
          @click="${() => this.save()}"
        >
          <i class="icon icon-check">✔️</i>
          <span data-i18n="formfooter.submit.btn">Submit</span>
        </button>
      </section>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has("form") || changedProperties.has("model")) {
      this._formLoaded = false;
      this.enketoForm = null;
      const formContainerEl = this.renderRoot.querySelector("#form-container");
      if (formContainerEl) {
        formContainerEl.innerHTML = "";
      }
      this.loadForm();
    }
  }

  private generateId(prefix: string): string {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }

  private save(opts = { draft: false }) {
    const { draft } = opts;
    const now = new Date().getTime();
    const enketoId = this.enketoId || this.generateId("enketo");
    const instanceId = this.instanceId || this.generateId("instance");
    const name = this.formName || this.generateId("autoSave");
    const entry: IEnketoFormEntry = {
      created: now,
      draft,
      enketoId,
      files: [],
      instanceId,
      name,
      updated: now,
      xml: this.xmlFormValue,
    };
    console.log("save entry", entry);
    this.dispatchEvent(
      new CustomEvent<IEventFormSaved>("formSaved", {
        detail: { entry },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private get xmlFormValue(): string {
    return this.enketoForm?.getDataStr() ?? "";
  }

  private handleEventDataUpdate(e: CustomEvent<{ nodes: string[] }>) {
    const nodes = e.detail?.nodes ?? [];
    this.dispatchEvent(
      new CustomEvent<IEventDataUpdated>("dataUpdated", {
        detail: { xml: this.xmlFormValue, nodes },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private handleEventXmlFormChange(
    _e: ReturnType<typeof Events.XFormsValueChanged>,
  ) {
    console.log("xml change", _e);
    // const formXML = this.xmlFormValue;
  }

  private loadForm() {
    const { form, model } = this;
    debug("loadForm called", {
      hasForm: !!form,
      hasModel: !!model,
      formLoaded: this._formLoaded,
    });

    if (!form || !model) {
      debug("loadForm: missing form or model");
      return;
    }

    const formContainerEl = this.renderRoot.querySelector("#form-container");
    if (!formContainerEl) {
      debug("loadForm: formContainerEl not found");
      this.status = "error";
      this.errorMessage = "Form container not found";
      return;
    }

    if (this._formLoaded) {
      debug("loadForm: form already loaded, skipping");
      return;
    }

    this.status = "loading";
    debug("loadForm: starting form initialization");

    formContainerEl.innerHTML = form;
    const formEl = formContainerEl.querySelector("form");
    if (formEl) {
      try {
        this.enketoForm = new Form(formEl, model, {});
        const loadErrors = this.enketoForm.init();
        if (loadErrors.length > 0) {
          console.error("Form load errors:", loadErrors);
        }
        this._formLoaded = true;
        this.status = "ready";
        debug("loadForm: form initialized successfully");

        this.enketoForm.model.events.addEventListener(
          Events.DataUpdate().type,
          this.handleEventDataUpdate.bind(this),
        );

        this.enketoForm.view.html.addEventListener(
          Events.XFormsValueChanged().type,
          this.handleEventXmlFormChange.bind(this),
        );
      } catch (err) {
        this.status = "error";
        this.errorMessage = err instanceof Error ? err.message : String(err);
        console.error("Failed to initialize form:", err);
        debug("loadForm: error", err);
      }
    } else {
      this.status = "error";
      this.errorMessage = "No <form> element found in form HTML";
      debug("loadForm: no form element found");
    }
  }
}
