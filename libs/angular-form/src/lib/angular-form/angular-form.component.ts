import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormMetadata } from '../models/form.model';
import { FormDataService } from '../services/form-data.service';
import { DynamicFormComponent } from '../components/dynamic-form/dynamic-form.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';


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
    private cdref: ChangeDetectorRef
  ){}


  ngOnInit(){

    this.fetchFormData('form');

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
