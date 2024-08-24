import { Injectable } from '@angular/core';
import { Validators, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DynamicValidationService {
  getValidators(validatorNames: string[]): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    if (validatorNames) {
      validatorNames.forEach(name => {
        if (name.startsWith('required')) {
          validators.push(Validators.required);
        } else if (name.startsWith('minLength')) {
          const len = parseInt(name.split(':')[1], 10);
          validators.push(Validators.minLength(len));
        } else if (name.startsWith('pattern')) {
          const pattern = name.split(':')[1];
          validators.push(Validators.pattern(new RegExp(pattern)));
        } else if (name === 'email') {
          validators.push(Validators.email);
        } else if (name === 'requiredTrue') {
          validators.push(Validators.requiredTrue);
        }
      });
    }
    return validators;
  }
}
