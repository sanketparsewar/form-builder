import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-form-builder-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './form-builder-page.component.html',
  styleUrl: './form-builder-page.component.css'
})
export class FormBuilderPageComponent {
  fields: {
    id: string;
    label: string;
    type: string;
    placeholder?: string;
    required?: boolean;
    minLength?: number;
    options?: string[];
    optionText?: string;
    value?: any[] | string;
    showEdit?: boolean;
    width: string;
  }[] = [];

  generatedHtml: string = '';
  generatedCss: string = '';
  generatedHtmlAndCss: string = ''

  fieldTypes = [
    { label: 'Text', value: 'text' },
    { label: 'Email', value: 'email' },
    { label: 'Password', value: 'password' },
    { label: 'Textarea', value: 'textarea' },
    { label: 'Checkbox', value: 'checkbox' },
    { label: 'Radio Group', value: 'radio' },
    { label: 'Select Dropdown', value: 'select' },
  ];

  addField(type: any): void {
    const uniqueId = type.value + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
    const newField: any = {
      id: uniqueId,
      label: type.label,
      type: type.value,
      placeholder: ``,
      required: true,
      minLength: type.value === 'password' ? 6 : undefined,
      value: type.value === 'checkbox' ? [] : '',
      options: ['checkbox', 'radio', 'select'].includes(type.value) ? ['Option 1', 'Option 2'] : '',
      optionText: '',
      showEdit: false,
      width: 'full' //full ,half
    };

    this.fields.push(newField);
  }

  onCheckboxChange(option: string, event: Event, field: any) {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      field.value.push(option);
    } else {
      field.value = field.value.filter((val: string) => val !== option);
    }
  }

  onRadioChange(option: string, event: Event, field: any) {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      field.value = option;
    } else {
      field.value = '';
    }
  }

  removeField(id: string): void {
    this.fields = this.fields.filter((field: any) => field.id !== id)
  }

  toggleEdit(id: string): void {
    const field = this.fields.find(f => f.id === id);
    if (field) {
      field.showEdit = !field.showEdit;
    }
  }


  updateOptions(id: string): void {
    const field = this.fields.find(f => f.id === id);
    if (field) {
      const optionText = field.optionText || '';
      field.options = optionText
        .split(',')
        .map((o: string) => o.trim())
        .filter((o: string) => o.length > 0);
      if (field.type == 'checkbox') {
        field.value = [];
      } else {
        field.value = '';
      }
    }
    console.log(field)
  }

  exportSchema(): void {
    const schema = JSON.stringify(this.fields, null, 2);
    // alert("Schema exported to console.");
  }


  generateFormHtml(): string | void {
    if (!this.fields.length) return this.generatedHtml = '';
    const styleBlock = `
  <style>
    label { 
      font-weight: 500; 
      margin-bottom: 0.25rem; 
      color: #374151; 
      }
    input, textarea, select {
      width: 100%;
      box-sizing: border-box;
      padding: 0.5rem 1rem;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      color: #1f2937;
    }
    .required-star{
      color:red;
      }
    .form-row {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      width: 100%;
    }
    .form-col-half {
      width: 48%;
      box-sizing: border-box;
    }
    .form-col-full {
      width: 99%;
      box-sizing: border-box;
    }
    .form-error {
      color: #dc2626;
      font-size: 0.75rem;
      margin-top: 0.25rem;
    }
    .radio-group, .checkbox-group {
      margin-top: 0.5rem;
    }
    .radio-group input,
    .checkbox-group input{
      width:1rem;
    }
    .radio-group label,
    .checkbox-group label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      margin-bottom: 0.25rem;
    }
    select {
      background-color: white;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
    }
    button[type="submit"] {
      padding: 0.5rem 1rem;
      background-color: #2563eb;
      color: white;
      border-radius: 0.375rem;
      font-size: 0.875rem;
    }
  </style>
`;

    const generateFieldHtml = (field: any) => {
      const requiredAttr = field.required ? 'required' : '';
      const placeholder = field.placeholder ? `placeholder="${field.placeholder}"` : '';
      const label = `<label>${field.label} <span class='required-star' >${field.required ? ' *' : ''}</span> </label>`;
      const errorDiv = `<div class="form-error error-${field.id}"></div>`;

      switch (field.type) {

        case 'textarea':
          return `${label}<textarea ${placeholder} ${requiredAttr} name="${field.id}"></textarea>${errorDiv}`;

        case 'radio':
          return `${label}<div class="radio-group">${field.options?.map((opt: any) => `
          <label>
            <input type="radio" name="${field.id}" value="${opt}" ${requiredAttr}> ${opt}
          </label>`).join('')}</div>${errorDiv}`;

        case 'checkbox':
          return `${label}<div class="checkbox-group">${field.options?.map((opt: any) => `
          <label>
            <input type="checkbox" name="${field.id}" value="${opt}" ${requiredAttr}> ${opt}
          </label>`).join('')}</div>${errorDiv}`;

        case 'select':
          return `${label}<select name="${field.id}" ${requiredAttr}>
            <option value="">Select</option>
            ${field.options?.map((opt: any) => `<option value="${opt}">${opt}</option>`).join('')}
          </select>${errorDiv}`;

        default:
          const typeAttrs = field.type === 'email' ? 'type="email"' :
            field.type === 'password' ? `type="password" minlength="${field.minLength || 6}"` :
              `type="${field.type}"`;
          return `${label}<input ${typeAttrs} ${placeholder} ${requiredAttr} name="${field.id}" />${errorDiv}`;
      }
    };

    const rows: any[] = [];
    for (let i = 0; i < this.fields.length; i++) {
      const field = this.fields[i];
      if (field.width === 'full') {
        rows.push([field]);
      } else if (field.width === 'half') {
        const nextField = this.fields[i + 1];
        if (nextField && nextField.width === 'half') {
          rows.push([field, nextField]);
          i++;
        } else {
          rows.push([field]);
        }
      }
    }

    const formBody = rows.map(group => {
      return `<div class="form-row">
      ${group.map((field: any) => {
        const colClass = field.width === 'half' ? 'form-col-half' : 'form-col-full';
        return `<div class="${colClass}">${generateFieldHtml(field)}</div>`;
      }).join('')}
    </div>`;
    }).join('\n');

    const scriptBlock = `
    <script>
      function validateForm(form) {
        let isValid = true;
        ${this.fields.map(field => {
      if (field.type === 'radio') {
        return `
              if (!form.querySelector('input[name="${field.id}"]:checked')) {
                document.querySelector('.error-${field.id}').textContent = "${field.label} is required.";
                isValid = false;
              } else {
                document.querySelector('.error-${field.id}').textContent = "";
              }`;
      } else if (field.type === 'checkbox') {
        return `
              const checked = Array.from(form.querySelectorAll('input[name="${field.id}"]:checked')).length;
              if (${field.required} && checked === 0) {
                document.querySelector('.error-${field.id}').textContent = "${field.label} is required.";
                isValid = false;
              } else {
                document.querySelector('.error-${field.id}').textContent = "";
              }`;
      } else {
        return `
              const input = form.elements["${field.id}"];
              if (input && input.validity.valueMissing) {
                document.querySelector('.error-${field.id}').textContent = "${field.label} is required.";
                isValid = false;
              } else if (input && input.validity.typeMismatch) {
                document.querySelector('.error-${field.id}').textContent = "Enter a valid ${field.label}.";
                isValid = false;
              } else if (input && input.validity.tooShort) {
                document.querySelector('.error-${field.id}').textContent = "${field.label} must be at least ${field.minLength || 6} characters.";
                isValid = false;
              } else {
                document.querySelector('.error-${field.id}').textContent = "";
              }`;
      }
    }).join('\n')}
        return isValid;
      }
    </script>
  `;


    this.generatedCss = `${styleBlock}`

    this.generatedHtml = `
  <form onsubmit="return validateForm(this)" style="display: flex; flex-direction: column; gap: 1rem;">
      ${formBody}
      <div class="form-col-full">
        <button type="submit">Submit</button>
      </div>
    </form>
  `

    this.generatedHtmlAndCss = `  
    ${this.generatedCss}
    ${this.generatedHtml}
    `;
  }


  copyCode() {
    if (!this.generatedHtmlAndCss) return;
    navigator.clipboard.writeText(this.generatedHtmlAndCss).then(() => {
      alert('Code copied to clipboard!');
    }).catch(err => {
      alert(`Failed to copy HTML: ${err}`);
    });
  }



}
