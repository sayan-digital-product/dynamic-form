import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DynamicEventService {
    bindEvents(form: FormGroup, metadata: any): void {
        metadata.fields.forEach((field: any) => {
        if (field.events) {
            field.events.forEach((event : any) => {
            form?.get(field.key)?.valueChanges.subscribe(value => {
                this.handleEvent(event, form, value);
            });
            });
        }
        });
    }

    handleEvent(event: string, form: FormGroup, value: any): void {
        switch (event) {
            case 'toggleDatePicker':
            this.toggleDatePicker(form, value);
            break;
            // Add more cases as needed
        }
    }

    toggleDatePicker(form: FormGroup, value: string): void {
        const datePickerControl = form.get('dateOfBirth');
        if (value === 'yes') {
            datePickerControl?.enable();
        } else {
            datePickerControl?.disable();
        }
    }
}
