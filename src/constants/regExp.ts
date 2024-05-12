export default Object.freeze({
  id18: /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  id15: /^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/,
  mobile:
    /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
  smsValidCode: /\d{6}/,
  validPhone: /(\d{3})\d{4}(\d{4})/,
  integer: /^[1-9]\d*$/,
  bankCard: /^[0-9]{6,19}$/,
  naturalNumber: /^[+]{0,1}(\d+)$/,
  positiveInteger: /^([1-9]{1}[0-9]{0,7})$/,
  positiveDecimal:
    /^0\.([1-9]|\d[1-9])$|^[1-9]\d{0,8}\.\d{0,2}$|^[0-9]\d{0,8}$/,
});