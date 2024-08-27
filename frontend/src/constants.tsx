export const EMAIL_MAX_LEN = 120;
export const PASSWORD_MAX_LEN = 25;
export const FIRST_NAME_MAX_LEN = 25;
export const LAST_NAME_MAX_LEN = 25;
export const USERNAME_MAX_LEN = 25;
export const TITLE_MAX_LEN = 50;
export const DESCRIPTION_MAX_LEN = 500;
export const PRICE_MAX_INT = 999999999;

export const EMAIL_MIN_LEN = 5;
export const PASSWORD_MIN_LEN = 8;
export const FIRST_NAME_MIN_LEN = 3;
export const LAST_NAME_MIN_LEN = 2;
export const USERNAME_MIN_LEN = 5;
export const TITLE_MIN_LEN = 5;
export const DESCRIPTION_MIN_LEN = 100;
export const PRICE_MIN_INT = 1;

export const URL = "http://127.0.0.1:5000/"
export const S3_URL = "https://table-top-trader-dev.s3.us-east-2.amazonaws.com/"

export const FORM_INPUTS = [
  {
    "label": "Email",
    "placeholder": "Email",
    "htmlFor": "email",
    "type": "email",
    "name": "email",
    "validation": {
      required: {
        value: true,
        message: 'required',
      },
      minLength: {
        value: EMAIL_MIN_LEN,
        message: `min ${EMAIL_MIN_LEN} characters`,
      },
      maxLength: {
        value: EMAIL_MAX_LEN,
        message: `max ${EMAIL_MAX_LEN} characters`,
      },
      pattern: {
        value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "Invalid Email",
      },
    }
  },
  {
    "label": "Username",
    "placeholder": "Username",
    "htmlFor": "username",
    "type": "text",
    "name": "username",
    "validation": {
      required: {
        value: true,
        message: 'required',
      },
      minLength: {
        value: USERNAME_MIN_LEN,
        message: `min ${USERNAME_MIN_LEN} characters`,
      },
      maxLength: {
        value: USERNAME_MAX_LEN,
        message: `max ${USERNAME_MAX_LEN} characters`,
      },
      pattern: {
        value: /^[a-zA-Z0-9_]*$/,
        message: "Only alphanumeric chars and _ allowed"
      }
    },
    "includeInSignIn": true,
  },
  {
    "label": "Password",
    "placeholder": "Password",
    "htmlFor": "password",
    "type": "password",
    "name": "password",
    "validation": {
      required: {
        value: true,
        message: 'required',
      },
      minLength: {
        value: PASSWORD_MIN_LEN,
        message: `min ${PASSWORD_MIN_LEN} characters`,
      },
      maxLength: {
        value: PASSWORD_MAX_LEN,
        message: `max ${PASSWORD_MAX_LEN} characters`,
      },
    },
    "includeInSignIn": true,
  },
  {
    "label": "First Name",
    "placeholder": "First Name",
    "htmlFor": "fname",
    "type": "text",
    "name": "firstName",
    "validation": {
      required: {
        value: true,
        message: 'required',
      },
      minLength: {
        value: FIRST_NAME_MIN_LEN,
        message: `min ${FIRST_NAME_MIN_LEN} characters`,
      },
      maxLength: {
        value: FIRST_NAME_MAX_LEN,
        message: `max ${FIRST_NAME_MAX_LEN} characters`,
      }
    },
  },
  {
    "label": "Last Name",
    "placeholder": "Last Name",
    "htmlFor": "lname",
    "type": "text",
    "name": "lastName",
    "validation": {
      required: {
        value: true,
        message: 'required',
      },
      minLength: {
        value: LAST_NAME_MIN_LEN,
        message: `min ${LAST_NAME_MIN_LEN} characters`,
      },
      maxLength: {
        value: LAST_NAME_MAX_LEN,
        message: `max ${LAST_NAME_MAX_LEN} characters`,
      }
    },
  },
];

export const CREATE_POST_FORM_INPUTS = [
  {
    "label" : "Title",
    "placeholder": "Title",
    "htmlFor": "Title",
    "type": "text",
    "name": "title",
    "validation": {
      required: {
        value: true, 
        message: 'required'
      },
      minLength: {
        value: TITLE_MIN_LEN,
        message: `min ${TITLE_MIN_LEN} characters`,
      },
      maxLength: {
        value: TITLE_MAX_LEN,
        message: `min ${TITLE_MAX_LEN} characters`
      }
    }
  },
  {
    "label" : "Description",
    "placeholder": "Description",
    "htmlFor": "Description",
    "type": "text",
    "name": "description",
    "validation": {
      required : {
        value: true,
        message: 'required'
      },
      minLength: {
        value: DESCRIPTION_MIN_LEN,
        message: `min ${DESCRIPTION_MIN_LEN} characters`
      },
      maxLength: {
        value: DESCRIPTION_MAX_LEN,
        message: `max ${DESCRIPTION_MAX_LEN} characters`
      }
    }
  },
  {
    "label" : "Price",
    "placeholder" : "Price",
    "htmlFor": "Price",
    "type": "number",
    "name": "price",
    "validation": {
      required : {
        value: true,
        message: 'required'
      },
      minInt: {
        value: PRICE_MIN_INT,
        message: `min ${PRICE_MIN_INT} number`,
      },
      maxInt: {
        value: PRICE_MAX_INT,
        message: `max ${PRICE_MAX_INT} number`,
      }
    }
  }
]
