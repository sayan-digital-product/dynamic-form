import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormField, FormMetadata } from '../../models/form.model';
import { DynamicValidationService } from '../../services/dynamic-validation.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DropdownDataService } from '../../services/dropdown-data.service';
import { DynamicEventService } from '../../services/dynamic-event.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'sb-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
  standalone: true,
  imports:[
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatRadioModule

  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent {
  protected _metaData!: FormMetadata;
  @Input({required: true}) set metaData(data: FormMetadata) {
    this._metaData = data ? data : this._metaData;
    this.form = this.createForm(this._metaData?.fields);
    this.eventService.bindEvents(this.form, this._metaData);
    this.populateDropdowns();
    this.setColumnClass();
  }
  form!: FormGroup;
  columnClass!: string;

  constructor(
    private fb: FormBuilder, 
    private validationService: DynamicValidationService,
    private dropdownDataService: DropdownDataService,
    private eventService: DynamicEventService,
  ) {}

  createForm(fields: FormField[]): FormGroup {
    const group = this.fb.group({});
    fields.forEach(field => {
      const control = this.fb.control(
        '',
        this.validationService.getValidators(field.validators as string[])
      );
      group.addControl(field.key, control);
    });
    return group;
  }

  populateDropdowns(): void {
    this._metaData.fields.forEach(field => {
      if (field.type === 'dropdown' && field.source === 'api') {
        this.dropdownDataService.getDropdownData(field.key).subscribe(options => {
          field.options = options;
          this.form.get(field.key)?.setValue(options[0]?.key || '');
        });
      }
    });
  }

  setColumnClass(): void {
    const columns = this._metaData.layout || 1;
    this.columnClass = `col-${columns}`;
  }

  onSubmit(): void {
    console.log(this.form.value);
  }
}
