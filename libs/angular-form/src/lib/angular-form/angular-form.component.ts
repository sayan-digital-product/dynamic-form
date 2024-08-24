import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormMetadata } from '../models/form.model';
import { FormDataService } from '../services/form-data.service';
import { DynamicFormComponent } from '../components/dynamic-form/dynamic-form.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { DynamicEventService } from '../services/dynamic-event.service';
import { EventHandlerModel } from '../models/event.model';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'sb-angular-form',
  standalone: true,
  imports: [
    CommonModule, 
    DynamicFormComponent,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatNativeDateModule
  ],
  templateUrl: './angular-form.component.html',
  styleUrl: './angular-form.component.scss',
})
export class AngularFormComponent implements OnInit{

  protected formData!: FormMetadata;

  constructor(
    private formSrv: FormDataService,
    private cdref: ChangeDetectorRef,
    private eventSrv: DynamicEventService
  ){

    this.eventSrv.eventname$.subscribe((event: EventHandlerModel) => {
      this.handleFormEvents(event);
    })
  }


  ngOnInit(){

    this.fetchFormData('form');

  }

  handleFormEvents(data: EventHandlerModel){
    switch(data.event){
      case 'toggleDatePicker': this.toggleDatePicker(data.form, data.key, data.value);
            break;
      default: this.eventError();
                break;
    }
  }

  toggleDatePicker(form: FormGroup, key: string, value: string): void {
    const datePickerControl = form.get('dateOfBirth');
    if (value === 'yes') {
        datePickerControl?.enable();
    } else {
        datePickerControl?.disable();
    }
  }

  eventError() {
    console.log("Event is not registered");
  }

  fetchFormData(fileName: string){

    this.formSrv.fetchFormMetadata(fileName)
    .subscribe((fieldsMeta: FormMetadata) => {

      if(fieldsMeta) {
        this.formData = fieldsMeta;
        this.cdref.markForCheck();

      } else {
        console.log('No field record found');
      }
    }, (err: any) => {
      console.log("Error occured :: ", err);
    })
  }

}
