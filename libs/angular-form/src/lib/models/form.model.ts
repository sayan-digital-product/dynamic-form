export interface FormFieldOptions {
    key: string;
    label: string;
  }
  
  export interface FormField {
    key: string;
    label: string;
    type: string;
    required: boolean;
    validators?: string[];
    options?: FormFieldOptions[];
    source?: string;
    className?: string;
  }
  
  export interface FormMetadata {
    formName: string;
    layout?: string;
    fields: FormField[];
  }
  