import { FormGroup } from "@angular/forms";

export interface EventHandlerModel {
    event: string;
    form: FormGroup;
    key: any;
    value: any;
}