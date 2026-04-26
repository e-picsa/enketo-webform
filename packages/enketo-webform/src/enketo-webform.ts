import { LitElement, html, nothing, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

// @ts-ignore
import Events from './libs/enketo/js/event';
// @ts-ignore
import { Form } from './libs/enketo/js/form';

export interface IEnketoFormEntry {
  created: number;
  draft: boolean;
  enketoId: string;
  files: any[];
  instanceId: string;
  name: string;
  updated: number;
  xml: string;
}

export interface IEventFormSaved {
  entry: IEnketoFormEntry;
}

export interface IEventDataUpdated {
  xml: string;
  nodes: string[];
}

@customElement('enketo-webform')
export class EnketoWebform extends LitElement {
  @property({ type: String }) form!: string;
  @property({ type: String }) model!: string;
  @property({ type: Boolean }) showButtons = true;

  @query('#form-container') private formContainerEl!: HTMLDivElement;

  @state() private enketoForm: Form | null = null;
  @state() private formHtml = '';

  private _formLoaded = false;

  static styles = css`
    :host {
      display: block;
      position: relative;
    }
    #form-unavailable {
      animation: appearDelayed 2s;
      -webkit-animation: appearDelayed 2s;
      -moz-animation: appearDelayed 2s;
      -o-animation: appearDelayed 2s;
      -ms-animation: appearDelayed 2s;
    }
    @keyframes appearDelayed {
      0% { opacity: 0; }
      90% { opacity: 0; }
      100% { opacity: 1; }
    }
  `;

  render() {
    if (!this.form || !this.model) {
      return html`<p data-testid="form-na" id="form-unavailable">Form not available</p>`;
    }

    return html`
      ${this.renderEnketoLogo()}
      <div id="form-container"></div>
      ${this.showButtons ? this.renderFooter() : nothing}
    `;
  }

  private renderEnketoLogo() {
    const logoBase64 =
      'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMjIwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCwgMCwgMjIwLCAxMDAiPgogIDxnIGlkPSJMYXllciAxIj4KICAgIDxnPgogICAgICA8cGF0aCBkPSJNMTcuOTUyLDcyLjQ4MiBMMTcuOTUyLDM4LjU0MSBDMTcuOTUyLDM1Ljg2OCAyMC4wNjYsMzMuNzU0IDIyLjczOCwzMy43NTQgTDM2LjQ5NiwzMy43NTQgQzM4Ljg1OSwzMy43NTQgNDAuNzg2LDM1LjY4MSA0MC43ODYsMzguMDQ0IEM0MC43ODYsNDAuNDA3IDM4Ljg1OSw0Mi4yNzEgMzYuNDk2LDQyLjI3MSBMMjcuNDY0LDQyLjI3MSBMMjcuNDY0LDUxLjA5OCBMMzMuNjk5LDUxLjA5OCBDMzYuMDYxLDUxLjA5OCAzNy45ODksNTMuMDI1IDM3Ljk4OSw1NS4zODggQzM3Ljk4OSw1Ny43NSAzNi4wNjEsNTkuNjE1IDMzLjY5OSw1OS42MTUgTDI3LjQ2NCw1OS42MTUgTDI3LjQ2NCw2OC43NTQgTDM2LjgwOCw2OC43NTQgQzM5LjE3LDY4Ljc1NCA0MS4wOTgsNzAuNjggNDEuMDk4LDczLjA0MyBDNDEuMDk4LDc1LjQwNCAzOS4xNyw3Ny4yNyAzNi44MDgsNzcuMjcgTDIyLjczOSw3Ny4yNyBDMjAuMDY2LDc3LjI2OSAxNy45NTIsNzUuMTU2IDE3Ljk1Miw3Mi40ODIgeiIgZmlsbD0iIzAwMDAwMCIvPgogICAgICA8cGF0aCBkPSJNMTE3LjkxOCw3Mi40ODIgTDExNy45MTgsMzguNTQxIEMxMTcuOTE4LDM1Ljg2OCAxMjAuMDMyLDMzLjc1NCAxMjIuNzA1LDMzLjc1NCBMMTM2LjQ2MywzMy43NTQgQzEzOC44MjUsMzMuNzU0IDE0MC43NTIsMzUuNjgxIDE0MC43NTIsMzguMDQ0IEMxNDAuNzUyLDQwLjQwNyAxMzguODI1LDQyLjI3MSAxMzYuNDYzLDQyLjI3MSBMMTI3LjQzLDQyLjI3MSBMMTI3LjQzLDUxLjA5OCBMMTMzLjY2Nyw1MS4wOTggQzEzNi4wMjgsNTEuMDk4IDEzNy45NTUsNTMuMDI1IDEzNy45NTUsNTUuMzg4IEMxMzcuOTU1LDU3Ljc1IDEzNi4wMjgsNTkuNjE1IDEzMy42NjcsNTkuNjE1IEwxMjcuNDMsNTkuNjE1IEwxMjcuNDMsNjguNzU0IEwxMzYuNzc1LDY4Ljc1NCBDMTM5LjEzNiw2OC43NTQgMTQxLjA2NCw3MC42OCAxNDEuMDY0LDczLjA0MyBDMTQxLjA2NCw3NS40MDQgMTM5LjEzNiw3Ny4yNyAxMzYuNzc1LDc3LjI3IEwxMjIuNzA2LDc3LjI3IEMxMjAuMDMyLDc3LjI2OSAxMTcuOTE4LDc1LjE1NiAxMTcuOTE4LDcyLjQ4MiB6IiBmaWxsPSIjMDAwMDAwIi8+';
    return html`
      <div class="enketo-logo-container">
        <span>Powered by</span>
        <a href="http://enketo.org" title="enketo.org website">
          <img class="enketo-logo" src="${logoBase64}" alt="Enketo logo" />
        </a>
      </div>
    `;
  }

  private renderFooter() {
    return html`
      <section id="form-footer">
        <button class="btn btn-default" id="save-draft" @click="${() => this.save({ draft: true })}">
          <i class="icon icon-pencil"> </i>
          <span data-i18n="formfooter.savedraft.btn">Save Draft</span>
        </button>
        <button class="btn btn-primary" id="submit-form" @click="${() => this.save()}">
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
    if (changedProperties.has('form') || changedProperties.has('model')) {
      this.loadForm();
    }
  }

  private save(opts = { draft: false }) {
    const { draft } = opts;
    const entry: IEnketoFormEntry = {
      created: 1683981755251,
      draft,
      enketoId: 'PGpldp9m',
      files: [],
      instanceId: '__autoSave_PGpldp9m',
      name: '__autoSave_1683981755249',
      updated: new Date().getTime(),
      xml: this.xmlFormValue,
    };
    console.log('save entry', entry);
    this.dispatchEvent(
      new CustomEvent<IEventFormSaved>('formSaved', {
        detail: { entry },
        bubbles: true,
        composed: true,
      })
    );
  }

  private get xmlFormValue(): string {
    return this.enketoForm?.getDataStr() ?? '';
  }

  private handleEventDataUpdate(e: ReturnType<typeof Events.DataUpdate>) {
    const nodes = e.detail.nodes;
    this.dispatchEvent(
      new CustomEvent<IEventDataUpdated>('dataUpdated', {
        detail: { xml: this.xmlFormValue, nodes },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleEventXmlFormChange(_e: ReturnType<typeof Events.XFormsValueChanged>) {
    const formXML = this.xmlFormValue;
  }

  private loadForm() {
    const { form, model } = this;
    const formContainerEl = this.renderRoot.querySelector('#form-container');
    if (form && model && formContainerEl && !this._formLoaded) {
      formContainerEl.innerHTML = form;
      const formEl = formContainerEl.querySelector('form');
      if (formEl) {
        try {
          this.enketoForm = new Form(formEl, model, {});
          const loadErrors = this.enketoForm.init();
          if (loadErrors.length > 0) {
            console.error(loadErrors);
          }
          this._formLoaded = true;

          this.enketoForm.model.events.addEventListener(
            Events.DataUpdate().type,
            this.handleEventDataUpdate.bind(this)
          );

          this.enketoForm.view.html.addEventListener(
            Events.XFormsValueChanged().type,
            this.handleEventXmlFormChange.bind(this)
          );
        } catch (err) {
          console.error('Failed to initialize form:', err);
        }
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'enketo-webform': EnketoWebform;
  }
}