import _ from 'lodash';

export const SIGN_UP_STATUS = [
  { label: '报名-待处理', value: 'SIGN_UP_PENDING' },
  { label: '报名-无意愿', value: 'SIGN_UP_NO_INTENTION' },
  { label: '报名-已报名', value: 'SIGN_UP_INTENTION', nextStage: true },
];

export const INTERVIEW_STATUS = [
  { label: '面试-待处理', value: 'INTERVIEW_PENDING' },
  { label: '面试-已通过', value: 'INTERVIEW_PASS', nextStage: true },
  { label: '面试-未接到', value: 'INTERVIEW_NOT_ARRIVAL' },
  { label: '面试-未通过', value: 'INTERVIEW_FAIL' },
];

export const EMPLOYMENT_STATUS = [
  { label: '待入职-待处理', value: 'EMPLOYMENT_PENDING' },
  { label: '待入职-已入职', value: 'EMPLOYMENT_PASS', nextStage: true },
  { label: '待入职-未报到', value: 'EMPLOYMENT_FAIL' },
];

export const STAFF_STATUS = [
  { label: '在离职-在职', value: 'STAFF_EMPLOYMENT' },
  { label: '在离职-离职', value: 'STAFF_RESIGN' },
];

export const LATEST_STATUS = _.concat(
  SIGN_UP_STATUS,
  INTERVIEW_STATUS,
  EMPLOYMENT_STATUS,
  STAFF_STATUS
);

export const SIGNUPTYPE_STATUS = [
  { label: '自招', value: 'RECRUIT' },
  { label: '供应商', value: 'SUPPLIER' },
];

export const ARRIVAL_MODES = [
  {
    label: '自行到场',
    value: 'FACTORY',
  },
  {
    label: '门店集合',
    value: 'STORE',
  },
];

export const ENTRYTYPE = [
  {
    label: '游客',
    value: 'TOURIST',
  },
  {
    label: '线上实名',
    value: 'ONLINE_REAL_NAME',
  },
  {
    label: '订单数据',
    value: 'ORDER_DATA',
  },
  {
    label: '离职跟进',
    value: 'RESIGN',
  },
];
