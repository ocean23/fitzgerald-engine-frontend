import { memo } from 'react';
import { Modal, Form, Input, Button, Select, message } from 'antd';
import { httpRequest } from '@/utils/index';

const { TextArea } = Input;

interface StrategyModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  strategyModalVal?: any;
}

const StrategyModal = memo(
  ({
    isOpen = false,
    onClose = () => {},
    strategyModalVal = {},
  }: StrategyModalProps) => {
    console.log('strategyModalVal: ', strategyModalVal);
    const [form] = Form.useForm();
    const handleOk = () => {
      // 处理确认操作
      onClose();
    };

    const onFinish = async (values) => {
      const res: any = await httpRequest.post('/strategyProcess', values);
      if (res.code === 0) {
        message.success('新增成功');
        form.resetFields();
        onClose();
      }
    };
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    return (
      <Modal
        title="新增策略分析流程"
        open={isOpen}
        onOk={handleOk}
        footer={null}
        onCancel={() => {
          onClose();
        }}
      >
        <Form
          name="basic"
          form={form}
          initialValues={strategyModalVal}
          labelCol={{
            span: 5,
          }}
          style={{
            maxWidth: 450,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="流程名称"
            name="name"
            rules={[
              {
                required: true,
                message: '请输入流程名称',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="应用场景"
            name="scene"
            rules={[
              {
                required: true,
                message: '请选择应用场景',
              },
            ]}
          >
            <Select
              options={[
                {
                  value: 'LOAN_PRE',
                  label: '贷前',
                },
                {
                  value: 'LOAN_DURING',
                  label: '贷中',
                },
                {
                  value: 'LOAN_POST',
                  label: '贷后',
                },
              ]}
            />
          </Form.Item>
          <Form.Item label="描述" name="description">
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-center">
              <Button
                className="mr-2"
                onClick={() => {
                  onClose();
                }}
              >
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                确定
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
);

export default StrategyModal;
