import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { EventHandlerModel } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class DynamicEventService {

    private _event = new Subject<EventHandlerModel>();
    readonly eventname$ = this._event.asObservable();

    bindEvents(form: FormGroup, metadata: any): void {
        metadata.fields.forEach((field: any) => {
        if (field.events) {
            field.events.forEach((event : any) => {
                const key =  form?.get(field.key);
            form?.get(field.key)?.valueChanges.subscribe((value) => {
                this.handleEvent({event, form, key, value});
            });
            });
        }
        });
    }

    handleEvent(eventdata: EventHandlerModel): void {
        this._event.next(eventdata);
    }

}
