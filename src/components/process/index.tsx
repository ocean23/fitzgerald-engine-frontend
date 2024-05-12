import { Steps, Row, Col, Drawer } from 'antd';
import {
  IdcardFilled,
  ExclamationCircleFilled,
  MedicineBoxFilled,
  PlusCircleFilled,
} from '@ant-design/icons';
import * as dayjs from 'dayjs';
import { datetimeFormat } from '@/constants';

const iconType = {
  UPDATE_ID_NO: <IdcardFilled style={{ color: 'red' }} />,
  UPDATE_STATUS: <ExclamationCircleFilled style={{ color: 'orange' }} />,
  UPDATE_POSITION: <MedicineBoxFilled style={{ color: 'volcano' }} />,
  ADD: <PlusCircleFilled style={{ color: 'green' }} />,
};
const textType = {
  UPDATE_ID_NO: '修改身份证',
  UPDATE_STATUS: '修改状态',
  UPDATE_POSITION: '修改岗位',
  ADD: '新增',
};
const enumTypw = {
  SIGN_UP_PENDING: '报名-待处理',
  SIGN_UP_NO_INTENTION: '报名-无意愿',
  SIGN_UP_INTENTION: '报名-已报名',
  // 面试
  INTERVIEW_PENDING: '面试-待处理',
  INTERVIEW_PASS: '面试-已通过',
  INTERVIEW_NOT_ARRIVAL: '面试-未接到',
  INTERVIEW_FAIL: '面试-未通过',
  // 待入职
  EMPLOYMENT_PENDING: '待入职-待处理',
  EMPLOYMENT_PASS: '待入职-已入职',
  // “未报到”是指会员来了之后，因为驻场的培训引导不到位 ，导致流失与驻场的工作能力有关系
  EMPLOYMENT_FAIL: '待入职-未报到',
  // “未接到“则与驻场的工作能力没关系
  EMPLOYMENT_NOT_ARRIVAL: '待入职-未接到',
  // 在职状态阶段(在离职)
  STAFF_EMPLOYMENT: '在离职-在职',
  STAFF_RESIGN: '在离职-离职',
};

interface IProcessProps {
  open: boolean;
  onCloseModal?: () => void;
  data?: {
    [key: string]: any;
    orderLogs?: Array<{
      operateType: string;
      operateTime: number;
      newStatus: string;
      newIdNo: string;
      newPositionName: string;
      userName: string;
    }>;
  };
}

function Process({
  open = false,
  onCloseModal = () => {},
  data = {},
}: IProcessProps) {
  const itemArray =
    (() =>
      data?.orderLogs?.map((item) => ({
        title: (
          <>
            {item?.userName}（{textType[item.operateType]}）
          </>
        ),
        icon: iconType[item.operateType],
        description: (
          <Row>
            <Col span={24}>
              修改时间：
              {item.operateTime
                ? dayjs(item.operateTime).format(datetimeFormat.dateTime)
                : '--'}
            </Col>
            {item?.operateType === 'ADD' && (
              <>
                <Col span={24}>
                  状态：
                  {enumTypw[item.newStatus] || '--'}
                </Col>
                <Col span={24}>
                  身份证号：
                  {item.newIdNo || '--'}
                </Col>
                <Col span={24}>
                  岗位名称：
                  {item.newPositionName || '--'}
                </Col>
              </>
            )}
            {item?.operateType === 'UPDATE_STATUS' && (
              <Col span={24}>
                状态：
                {enumTypw[item.newStatus] || '--'}
              </Col>
            )}
            {item?.operateType === 'UPDATE_ID_NO' && (
              <Col span={24}>
                身份证号：
                {item.newIdNo || '--'}
              </Col>
            )}
            {item?.operateType === 'UPDATE_POSITION' && (
              <Col span={24}>
                岗位名称：
                {item.newPositionName || '--'}
              </Col>
            )}
          </Row>
        ),
      })))() || [];
  return (
    <Drawer
      title="订单操作日志"
      open={open}
      onClose={() => onCloseModal()}
      size="large"
    >
      <Row style={{ lineHeight: '40px', fontSize: '20px', fontWeight: 600 }}>
        {data?.name}
        -订单操作日志
      </Row>
      <Row
        style={{
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '10px',
          backgroundColor: '#f1f1f1',
        }}
      >
        <Col span={12}>
          <Row gutter={[16, 16]}>
            <Col span="24">
              姓名：
              {data?.name || '--'}
            </Col>
            <Col span="24">
              身份证号：
              {data?.idNo || '--'}
            </Col>
            <Col span="24">
              所属企业：
              {data?.shortCompanyName || '--'}
            </Col>
          </Row>
        </Col>
      </Row>
      <Steps direction="vertical" current={100} items={[...itemArray]} />
    </Drawer>
  );
}

export default Process;
