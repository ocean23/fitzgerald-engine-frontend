import { useEffect, useState } from 'react';
import { FormItem } from '@components/index';
import { Col, Card, Form, Select, Space, message } from 'antd';
import { httpRequest } from '@utils/index';
import { Rule } from 'antd/es/form';

interface ModeItemProps {
  values: {
    defaultValue:any[],
    rules?:Rule[] | undefined,
    name?: string,
    label?: string,
    type?: string,
    jsonData: string,
  };
  typesArray: any[];
  modesArray: any[];
  onTypeChange: (type) => void;
  onModeChange: (mode) => void;
}

function ModeItem({
  values = {
    defaultValue:[],
    jsonData:""
  },
  typesArray = [],
  modesArray = [],
  onTypeChange = () => {},
  onModeChange = () => {},
}:ModeItemProps) {
  const [fields, setFields] = useState<any[]>([]);
  const [selectMode, setSelectMode] = useState<any>();
  const [selectType, setSelectType] = useState();

  const getUserInfo = async (memberModeId) => {
    if (memberModeId) {
      try {
        const res:any = await httpRequest.get(`/memberMode/${memberModeId}`);
        if (res.code === 0) {
          setFields(() =>
            res.data.params.map((item) => {
              if (item.type === 'INTEGER') {
                return {
                  label: item.desc,
                  name: item.name,
                  key: item.name,
                  type: 'INPUT_NUMBER',
                  inputProps: {
                    min: 1,
                    max: 31,
                    precision: 0,
                  },
                  rules: [
                    {
                      required: true,
                    },
                  ],
                };
              }
              return {
                label: item.desc,
                name: item.name,
                key: item.name,
                type: item.type === 'NUMBER' ? 'INPUT_NUMBER' : 'INPUT',
                inputProps: {
                  min: 0,
                },
                rules: [
                  {
                    required: true,
                  },
                ],
              };
            })
          );
        } else {
          throw new Error(res.msg);
        }
      } catch (err) {
        message.error(err.message || '获取模式失败');
      }
    } else {
      setFields([]);
    }
  };
  const handleModeChange = (value) => {
    setSelectMode(value);
    getUserInfo(value);
    onModeChange(value);
  };
  const handleTypeChange = (e) => {
    onTypeChange(e);
    setSelectType(e);
    setSelectMode(null);
    setFields([]);
  };
  useEffect(() => {
    if (values.defaultValue.length) {
      setSelectType(values.defaultValue[0]);
      setSelectMode(values.defaultValue[1]);
      getUserInfo(values.defaultValue[1]);
    }
  }, [values?.defaultValue]);
  return (
    <>
      <Form.Item
        key={values.name}
        name={values.name}
        label={values.label}
        rules={values.rules}
      >
        <Space wrap>
          <Select
            style={{
              width: 200,
            }}
            value={selectType}
            onChange={handleTypeChange}
            options={typesArray}
            allowClear
            showSearch
            optionFilterProp="label"
            placeholder="请选择大类"
            getPopupContainer={(triggerNode) => triggerNode}
          />
          <Select
            style={{
              width: 200,
            }}
            value={selectMode}
            onChange={handleModeChange}
            options={modesArray}
            allowClear
            showSearch
            optionFilterProp="label"
            placeholder="请选择模式"
            getPopupContainer={(triggerNode) => triggerNode}
          />
        </Space>
      </Form.Item>
      <Col push={6} span={10} style={{ marginBottom: 30 }}>
        {fields.length > 0 && (
          <Card hoverable>
            <Form.List name={values.jsonData}>
              {() =>
                fields.map((field) => (
                  // eslint-disable-next-line max-len
                  <FormItem
                    {...field}
                    key={field.key}
                    label={field.label}
                    labelCol={{ span: 4 }}
                  />
                ))
              }
            </Form.List>
          </Card>
        )}
      </Col>
    </>
  );
}
// ModeItem.propTypes = {
//   values: PropTypes.shape({
//     name: PropTypes.string,
//     label: PropTypes.string,
//     type: PropTypes.string,
//     jsonData: PropTypes.string,
//     // defaultValue: PropTypes.arrayOf,
//     rules: PropTypes.shape({}),
//   }).isRequired,
//   typesArray: PropTypes.arrayOf,
//   modesArray: PropTypes.arrayOf,
//   onTypeChange: PropTypes.func,
//   onModeChange: PropTypes.func,
// };

export default ModeItem;
