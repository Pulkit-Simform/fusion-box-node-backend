export const message = {
  SUCCESS: {
    OK: 'success.OK',
    USER_PROFILE: 'User Profile',
    DEPARTMENT: 'Department',
    REGISTER: 'User Registered Successfully',
    INTERNAL_SERVER_ERROR: 'error.INTERNAL_SERVER_ERROR',
    AUTH: {
      INVALID_TOKEN: 'error.AUTH.INVALID_TOKEN',
      TOKEN_EXPIRED: 'error.AUTH.TOKEN_EXPIRED',
      TOKEN_NOT_FOUND: 'error.AUTH.TOKEN_NOT_FOUND',
      SESSION_EXPIRED: 'error.AUTH.SESSION_EXPIRED',
      LOGIN: 'User Login Successfully',
    },
    FORBIDDEN: 'error.FORBIDDEN',
  },
  ERROR: {
    AUTH: {
      TOKEN_NOT_FOUND: 'Token not found!',
      TOKEN_EXPIRED: 'Invalidate token, Token may expired!',
      SESSION_EXPIRED: 'Session has expired, please login',
      INVALID_CREDENTIALS: 'User email or password is not correct',
    },
    SIGNUP: {
      USER_EMAIL_EXISTS: 'Email is already Registered!',
      USER_PHONE_EXISTS: 'Phone Number is already Registered!',
    },
  },
  VALIDATION: {
    NOT_EMPTY: (key: string) =>
      `error.VALIDATION.NOT_EMPTY|{"args":{"key":"${key}"}}`,
    IS_INT: (key: string) =>
      `error.VALIDATION.IS_INT|{"args":{"key":"${key}"}}`,
    IS_STRING: (key: string) =>
      `error.VALIDATION.IS_STRING|{"args":{"key":"${key}"}}`,
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

  DSU: {
    SUCCESS: {
      CREATED: 'DSU Created',
      UPDATED: 'DSU Updated',
      SINGLE_DSU: 'DSU',
      DELETED: 'DSU Deleted',
    },
    ERROR: {
      NO_PROJECT_FOUND: 'No Project found with this id!',
      NO_DSU_FOUND: 'No dsu found with this id',
    },
  },
  EVENT: {
    SUCCESS: {
      SINGLE_EVENT: 'EVENT',
      CREATED: 'Event Created',
      UPDATED: 'Event Updated',
      DELETED: 'Event Deleted',
    },
    ERROR: {
      NOT_FOUND: 'No Event Found',
    },
  },
  PROJECT: {
    SUCCESS: {
      CREATED: 'Project Created Successfully',
      UPDATED: 'Project Updated Successfully',
      DELETED: 'Project Deleted Successfully',
      SINGLE_PROJECT: 'Project',
    },
    ERROR: {
      NOT_FOUND: 'Project Not found with this id',
    },
  },
  SKILL: {
    SUCCESS: {
      CREATED: 'Skill Created Successfully',
      UPDATED: 'Skill Updated Successfully',
      DELETED: 'Skill Deleted Successfully',
      SINGLE_PROJECT: 'Skill',
    },
    ERROR: {
      NOT_FOUND: 'Skill Not found with this id',
    },
  },
};
