import { memo } from 'react';
import { Modal, Table } from 'antd';
import { globalStyles } from '@styles/index';

const { Content } = globalStyles;

interface ProcessInfoModalProps {
  isInfoModalOpen?: boolean;
  onCancelInfoModal?: (open?:any) => void;
}

// eslint-disable-next-line func-names
const ProcessInfoModal = memo(function ({
  isInfoModalOpen = false,
  onCancelInfoModal = () => {},
}: ProcessInfoModalProps) {
  return (
    <div>
      <Modal
        title="详情"
        open={isInfoModalOpen}
        footer={null}
        onCancel={() => {
          onCancelInfoModal();
        }}
      >
        <Content>
          <Table
            // loading={isLoading}
            // dataSource={data}
            // columns={columns}
            // onChange={handleTableChange}
            pagination={{
              showSizeChanger: true,
              // total,
              // showTotal: () => `总数：${total}`,
            }}
          />
        </Content>
      </Modal>
    </div>
  );
});

export default ProcessInfoModal;
