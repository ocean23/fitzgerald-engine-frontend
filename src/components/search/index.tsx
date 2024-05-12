import { useEffect, ReactNode } from 'react';
import { Form, Button, Row, Col, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { searchFieldCol } from '@/constants';

import FormItem from '../formItem';

interface SearchProps {
  onSubmit?: () => void;
  fields?: any[];
  extra?: ReactNode;
  initialValues?: any;
  // eslint-disable-next-line
  getForm?: (form: any) => void;
}

function Search({
  onSubmit = () => {},
  fields = [],
  extra = null,
  initialValues = {},
  getForm = () => {},
}: SearchProps) {
  const [form] = Form.useForm();
  useEffect(() => {
    if (getForm) {
      getForm(form);
    }
  }, [getForm, form]);

  return (
    <Form form={form} onFinish={onSubmit} initialValues={initialValues}>
      <Row gutter={24}>
        {fields.map((f) => {
          const basic = f.searchFieldCol
            ? f.searchFieldCol
            : searchFieldCol.basic;
          return f.fields?.length ? (
            <Col span={12}>
              <Form.Item
                name={f.name}
                key={f.name}
                label={f.label}
                style={{ marginBottom: 0 }}
              >
                <Row align="middle">
                  {f.fields.map((cf, index) => (
                    <Col span={8}>
                      {index > 0 && (
                        <span style={{ margin: '0 10px 24px' }}>
                          {f.separator}
                        </span>
                      )}
                      <FormItem
                        key={cf.name}
                        name={cf.name}
                        label={cf.label}
                        type={cf.type}
                        inputProps={{
                          ...cf.inputProps,
                          onChange: (val) => {
                            if (cf?.inputProps?.onChange) {
                              cf.inputProps.onChange(val, cf.name);
                            }
                          },
                        }}
                        labelAlign="right"
                      />
                    </Col>
                  ))}
                </Row>
              </Form.Item>
            </Col>
          ) : (
            <Col {...basic} key={f.name}>
              <FormItem
                key={f.name}
                name={f.name}
                label={f.label}
                type={f.type}
                showAllOption={f.showAllOption}
                inputProps={f.inputProps}
                labelAlign="right"
              />
            </Col>
          );
        })}
        <Col />
        <Form.Item>
          <Space size={10}>
            <Button icon={<SearchOutlined />} type="primary" htmlType="submit">
              搜索
            </Button>
            <Button
              onClick={() => {
                form.resetFields();
                form.submit();
              }}
            >
              重置
            </Button>
          </Space>
        </Form.Item>
        {extra}
      </Row>
    </Form>
  );
}

export default Search;
