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
    };
    pattern?: {
      value: RegExp;
      message: string;
    } |
    undefined
  };
  includeInSignIn?: boolean | undefined;
}
