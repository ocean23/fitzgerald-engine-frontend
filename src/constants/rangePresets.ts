import * as dayjs from 'dayjs';

export default [
  {
    label: '今天',
    value: [dayjs(), dayjs()],
  },
  {
    label: '本周',
    value: [
      dayjs().startOf('week').add(1, 'day'),
      dayjs().endOf('week').add(1, 'day'),
    ],
  },
  {
    label: '上周',
    value: [
      dayjs().add(-1, 'week').startOf('week').add(1, 'day'),
      dayjs().add(-1, 'week').endOf('week').add(1, 'day'),
    ],
  },
  {
    label: '本月',
    value: [dayjs().startOf('month'), dayjs().endOf('month')],
  },
  {
    label: '上月',
    value: [
      dayjs().add(-1, 'month').startOf('month'),
      dayjs().add(-1, 'month').endOf('month'),
    ],
  },
];
