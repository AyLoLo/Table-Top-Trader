export interface InputAttribute {
  htmlFor: string,
  label: string,
  type: string,
  id: string,
  placeholder: string,
  name: string,
}

export interface InputProp {
  label: string;
  placeholder: string;
  htmlFor: string;
  type: string;
  name: string;
  validation: {
    required: {
      value: boolean;
      message: string;
    };
    minLength: {
      value: number;
      message: string;
    };
    maxLength: {
      value: number;
      message: string;
    }
  }
  includeInSignIn?: boolean | undefined;
}