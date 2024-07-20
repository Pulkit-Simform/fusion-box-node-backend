export const message = {
  SUCCESS: {
    OK: 'success.OK',
    INTERNAL_SERVER_ERROR: 'error.INTERNAL_SERVER_ERROR',
    AUTH: {
      INVALID_TOKEN: 'error.AUTH.INVALID_TOKEN',
      TOKEN_EXPIRED: 'error.AUTH.TOKEN_EXPIRED',
      TOKEN_NOT_FOUND: 'error.AUTH.TOKEN_NOT_FOUND',
      SESSION_EXPIRED: 'error.AUTH.SESSION_EXPIRED',
    },
    FORBIDDEN: 'error.FORBIDDEN',
  },
  ERROR:{
    AUTH:{
      TOKEN_NOT_FOUND:"Token not found!",
      TOKEN_EXPIRED:"Invalidate token, Token may expired!",
      SESSION_EXPIRED:"Session has expired, please login"
    }
  },
  VALIDATION: {
    NOT_EMPTY: (key: string) =>
      `error.VALIDATION.NOT_EMPTY|{"args":{"key":"${key}"}}`,
    IS_INT: (key: string) =>
      `error.VALIDATION.IS_INT|{"args":{"key":"${key}"}}`,
    IS_BOOLEAN: (key: string) =>
      `error.VALIDATION.IS_BOOLEAN|{"args":{"key":"${key}"}}`,
    IS_UUID_V4: (key: string) =>
      `error.VALIDATION.IS_UUID_V4|{"args":{"key":"${key}"}}`,
    IS_ARRAY: (key: string) =>
      `error.VALIDATION.IS_ARRAY|{"args":{"key":"${key}"}}`,
    IS_UNIQUE_ARRAY: (key: string) =>
      `error.VALIDATION.IS_UNIQUE_ARRAY|{"args":{"key":"${key}"}}`,
    IS_EMPTY_ARRAY: (key: string) =>
      `error.VALIDATION.IS_EMPTY_ARRAY|{"args":{"key":"${key}"}}`,
    IS_ENUM: (key: string, value: string) =>
      `error.VALIDATION.IS_ENUM|{"args":{"key":"${key}","value":"${value}"}}`,
    IS_NUMBER_ARRAY: (key: string) =>
      `error.VALIDATION.IS_NUMBER_ARRAY|{"args":{"key":"${key}"}}`,
    MIN_REQUIRED: (key: string) =>
      `error.VALIDATION.MIN_REQUIRED|{"args":{"key":"${key}"}}`,
    IS_INVALID: (key: string) =>
      `error.VALIDATION.IS_INVALID|{"args":{"key":"${key}"}}`,
    IS_SAME_DAY: () => `error.VALIDATION.IS_SAME_DAY`,
    SHOULD_BE_FUTURE_DATE: (key: string) =>
      `error.VALIDATION.SHOULD_BE_FUTURE_DATE|{"args":{"key":"${key}"}}`,
  },
};
