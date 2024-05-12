/* eslint-disable react/jsx-props-no-spreading */
import {
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  Switch,
  Checkbox,
  TimePicker,
  Cascader,
  InputNumber,
} from 'antd';
// import 'braft-editor/dist/index.css';

export const inputType = {
  input: 'INPUT',
  inputNumber: 'INPUT_NUMBER',
  select: 'SELECT',
  switch: 'SWITCH',
  datePicker: 'DATE_PICKER',
  timePicker: 'TIME_PICKER',
  rangePicker: 'RANGE_PICKER',
  timeRangePicker: 'TIME_RANGE_PICKER',
  radio: 'RADIO',
  radioGroup: 'RADIO_GROUP',
  checkbox: 'CHECKBOX',
  checkboxGroup: 'CHECKBOX_GROUP',
  cascader: 'CASCADER',
  inputTextArea: 'INPUT_TEXTAREA',
};

interface FormItemProps {
  type: string;
  inputProps?: any;
  showAllOption?: boolean;
  label?: string;
  [key: string]: any;
}

function FormItem({
  type = inputType.input,
  inputProps = {},
  showAllOption = false,
  ...rest
}: FormItemProps) {
  let input;
  switch (type) {
    case inputType.inputNumber:
      input = <InputNumber {...inputProps} />;
      break;
    case inputType.select:
      input = (
        <Select
          {...inputProps}
          options={
            showAllOption
              ? [{ label: '全部', value: '' }].concat(inputProps.options)
              : inputProps.options
          }
          getPopupContainer={(triggerNode) => triggerNode}
        />
      );
      break;
    case inputType.switch:
      input = <Switch {...inputProps} />;
      break;
    case inputType.datePicker:
      input = (
        <DatePicker
          {...inputProps}
          getPopupContainer={(triggerNode) => triggerNode}
        />
      );
      break;
    case inputType.timePicker:
      input = (
        <TimePicker
          {...inputProps}
          getPopupContainer={(triggerNode) => triggerNode}
        />
      );
      break;
    case inputType.timeRangePicker:
      input = (
        <TimePicker.RangePicker
          {...inputProps}
          getPopupContainer={(triggerNode) => triggerNode}
        />
      );
      break;
    case inputType.rangePicker:
      input = (
        <DatePicker.RangePicker
          {...inputProps}
          getPopupContainer={(triggerNode) => triggerNode}
        />
      );
      break;
    case inputType.radio:
      input = <Radio {...inputProps} />;
      break;
    case inputType.radioGroup:
      input = <Radio.Group {...inputProps} />;
      break;
    case inputType.checkbox:
      input = <Checkbox {...inputProps} />;
      break;
    case inputType.checkboxGroup:
      input = <Checkbox.Group {...inputProps} />;
      break;
    case inputType.inputTextArea:
      input = <Input.TextArea {...inputProps} />;
      break;
    case inputType.cascader:
      input = (
        <Cascader
          {...inputProps}
          getPopupContainer={(triggerNode) => triggerNode}
        />
      );
      break;
    default:
      input = <Input {...inputProps} />;
      break;
  }
  return <Form.Item {...rest}>{input}</Form.Item>;
}

export default FormItem;
