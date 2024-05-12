import { Select } from 'antd';

interface SelectOptionsProps {
  options: any[];
  tipsDefault?: string;
  [key: string]: any;
}

function SelectOptions({
  options,
  tipsDefault = '已选身份证',
  ...rest
}: SelectOptionsProps) {
  return (
    <Select
      popupMatchSelectWidth={false}
      value={`${tipsDefault}(${options.length})`}
      options={options}
      {...rest}
    />
  );
}
export default SelectOptions;
