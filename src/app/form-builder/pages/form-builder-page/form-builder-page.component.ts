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
    value?: any[];
    showEdit?: boolean;
    width: string;
  }[] = [];

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
      minLength: type === 'password' ? 6 : undefined,
      value: type.value === 'checkbox' ? [] : '',
      options: ['checkbox', 'radio', 'select'].includes(type.value) ? ['Option 1', 'Option 2'] : '',
      optionText: '',
      showEdit: false,
      width: 'full' //full ,half
    };

    if (type === 'radio' || type === 'select') {
      newField.options = ['Option 1', 'Option 2'];
      newField.optionText = newField.options.join(',');
    }

    this.fields.push(newField);
    console.log(newField)
  }
  onCheckboxChange(option: string, event: Event, field: any) {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      field.value.push(option);
    } else {
      field.value = field.value.filter((val: string) => val !== option);
    }
    console.log(field)
  }

  onRadioChange(option: string, event: Event, field: any) {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      field.value = option;
    } else {
      field.value = [];
    }
    console.log(field)
  }

  removeField(index: number): void {
    this.fields.splice(index, 1);
  }

  toggleEdit(index: number): void {
    this.fields[index].showEdit = !this.fields[index].showEdit;
  }

  updateOptions(index: number): void {
    const optionText = this.fields[index].optionText || '';
    this.fields[index].options = optionText
      .split(',')
      .map((o: string) => o.trim())
      .filter((o: string) => o.length > 0);
  }

  // exportSchema(): void {
  //   const schema = JSON.stringify(this.fields, null, 2);
  //   console.log(schema);
  //   alert("Schema exported to console.");
  // }


}
