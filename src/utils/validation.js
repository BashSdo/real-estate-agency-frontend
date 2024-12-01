export const addressRules = [
  v => /^(\S(.*){0,510}\S|\S)?$/u.test(v) || 'Invalid',
];

export const requiredAddressRules = [v => !!v || 'Required', ...addressRules];

export const contractTextRules = [
  v => !!v || 'Required',
  v => /^(\S(.*){0,510}\S|\S)?$/u.test(v) || 'Invalid',
];

export const nameRules = [
  v => !!v || 'Required',
  v => /^(\S(.*){0,126}\S|\S)?$/u.test(v) || 'Invalid',
];

export const loginRules = [
  v => !!v || 'Required',
  v => /^\S[\p{L}\p{N}]{0,98}\S$/u.test(v) || 'Invalid',
];

export const emailRules = [
  v => !!v || 'Required',
  v =>
    /((([^<>()[]\\.,;:\s@"]+\(\.[^<>()[]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/.test(
      v,
    ) || 'Invalid',
];

export const phoneRules = [
  v => !!v || 'Required',
  v =>
    /^([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/.test(v) || 'Invalid',
];

export const passwordRules = [
  v => !!v || 'Required',
  v => /^(\S(.*){0,126}\S)?$/u.test(v) || 'Invalid',
];

export const numbersOnlyRules = [
  v => /^[0-9]*$/.test(v) || 'Only numbers are allowed',
];

export const requiredNumbersOnlyRules = [
  v => !!v || 'Required',
  ...numbersOnlyRules,
];

export const moneyRules = [
  v =>
    v.length === 0 ||
    /^[0-9]+(\.[0-9]{1,2})?(USD|EUR|RUB)$/.test(v) ||
    'Invalid, must be in format 0.00USD',
];

export const requiredMoneyRules = [v => !!v || 'Required', ...moneyRules];
