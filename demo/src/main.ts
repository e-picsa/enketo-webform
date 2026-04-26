import './styles.scss';
import '@picsa/enketo-webform/styles';
import { MOCK_DATA } from './fixtures';

type FormOption = {
  name: string;
  form: string;
  model: string;
};

const formOptions: FormOption[] = [
  {
    name: 'Basic Form',
    form: MOCK_DATA.basic.form,
    model: MOCK_DATA.basic.model,
  },
  {
    name: 'Kitchen Sink',
    form: MOCK_DATA.kitchenSink.form,
    model: MOCK_DATA.kitchenSink.model,
  },
];

function renderFormSelector() {
  const selector = document.getElementById('form-selector');
  if (!selector) return;

  formOptions.forEach((option, index) => {
    const button = document.createElement('button');
    button.textContent = option.name;
    button.className = 'form-option-btn';
    button.addEventListener('click', () => loadForm(index));
    selector.appendChild(button);
  });
}

function loadForm(index: number) {
  const option = formOptions[index];
  const webform = document.querySelector('enketo-webform') as HTMLElement & {
    form?: string;
    model?: string;
  };
  if (webform) {
    webform.setAttribute('form', option.form);
    webform.setAttribute('model', option.model);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderFormSelector();
  loadForm(0);
});