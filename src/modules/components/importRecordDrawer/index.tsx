/* eslint-disable consistent-return */
/* eslint-disable prefer-template */
import  { useState, useEffect, useRef } from 'react';
import { Drawer, message, Image, Button, TableProps } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import { useQuery } from 'react-query';
import * as dayjs from 'dayjs';
import { httpRequest } from '@/utils';
import { datetimeFormat } from '@/constants';
import { TableError, TableRecord } from './styles';
import { taskStatus } from './constant';
import file from './img/file.png';
import StatusSuccess from './img/status-success.png';

const getColumns = ({ handleOpen, expandedRowKeys }) => [
  {
    title: '任务ID',
    dataIndex: 'sequence',
    key: 'sequence',
    align: 'center',
  },
  {
    title: '导入时间',
    dataIndex: 'importTime',
    key: 'importTime',
    align: 'center',
    width: 250,
    render: (text, record) =>
      record.importTime
        ? dayjs(record.importTime).format(datetimeFormat.dateTime)
        : '',
  },
  {
    title: '执行进度',
    dataIndex: 'status',
    key: 'status',
    width: 100,
    align: 'center',
    render: (text, record) => (
      <Image
        src={taskStatus[record.status]}
        style={{ width: '30px' }}
        preview={false}
      />
    ),
  },
  {
    title: '任务状态',
    dataIndex: 'status',
    key: 'status',
    width: 150,
    align: 'center',
    render: (text, record) =>
      record.status === 'finish' &&
      (record.fail ? (
        <Button type="link" danger onClick={(e) => handleOpen(e, record)}>
          详情
          {expandedRowKeys.includes(record.id) ? (
            <UpOutlined />
          ) : (
            <DownOutlined />
          )}
        </Button>
      ) : (
        <Image src={StatusSuccess} style={{ width: '30px' }} preview={false} />
      )),
  },
  {
    title: '导入成功数',
    dataIndex: 'successCount',
    key: 'successCount',
    align: 'center',
  },
  {
    title: '导入失败数',
    dataIndex: 'failureCount',
    key: 'failureCount',
    align: 'center',
  },
  {
    title: '导入人',
    dataIndex: 'operator',
    key: 'operator',
    align: 'center',
    width: 100,
  },
  {
    title: '原始文件',
    dataIndex: 'originalFile',
    key: 'originalFile',
    align: 'center',
    width: 120,
    render: (value, record) => (
      <a href={record.originalFile}>
        <Image src={file} style={{ width: '32px' }} preview={false} />
      </a>
    ),
  },
];
const errorColumns = [
  {
    title: '行数',
    dataIndex: 'row',
    key: 'row',
  },
  {
    title: '身份证ID',
    dataIndex: 'idNo',
    key: 'idNo',
  },
  {
    title: '错误信息',
    dataIndex: 'errorMsg',
    key: 'errorMsg',
  },
];

interface ImportRecordDrawerProps {
  open: boolean;
  type?: string;
  onClose?: () => void;
}

function ImportRecordDrawer({ open = false, type, onClose = () => {} }:ImportRecordDrawerProps) {
  const [pagination, setPagination] = useState({
    pageNumber: 0,
    pageSize: 15,
    total: 0,
  });
  const timer:any = useRef(null);
  const [expandedRowKeys, setExpandedRowKeys] = useState<any[]>([]);
  const [selectCurrentRowKey,setSelectCurrentRowKey] = useState();
  const handleTableChange = (params) => {
    setPagination({
      ...params,
      pageNumber: params.current - 1,
    });
  };
  const getData = async () => {
    if (!open) {
      return;
    }
    const res = await httpRequest.post('/common/syncImport/tasks', {
      type,
      ...pagination,
    });
    setPagination({
      ...pagination,
      pageNumber: res?.data?.pageNumber,
      pageSize: res?.data?.pageSize,
      total: res?.data?.total,
    });
    return res.data.content;
  };

  const { isLoading, error, data, refetch }:{
    isLoading: boolean;
    [key:string]:any
  } = useQuery(
    ['importexcal', pagination, open],
    getData
  );
  useEffect(() => {
    if (error) {
      message.error(error?.message);
    }
  }, [error]);
  useEffect(
    () => {
      if (
        open &&
        data?.find((r) => r?.status === 'running' || r?.status === 'finish')
      ) {
        timer.current = setInterval(refetch, 1000);
      }
      return () => {
        clearInterval(timer.current);
      };
    },
    [open, data, refetch],
  );

  const columns:any = getColumns({
    handleOpen: (e, record) => {
      const { id } = record;
      setSelectCurrentRowKey(id);
      const filtered:any[] = [...expandedRowKeys];
      // @ts-ignore
      if (expandedRowKeys.includes(id)) {
        filtered.splice(
          filtered.findIndex((element) => element === id),
          1
        );
      } else {
        filtered.push(id);
      }
      setExpandedRowKeys(filtered);
    },
    expandedRowKeys,
  });
  return (
    <Drawer open={open} title="导入记录" onClose={onClose} width="1100">
      <TableRecord
        size="small"
        columns={columns}
        dataSource={data}
        expandedRowKeys={expandedRowKeys}
        rowKey={(record) => record.id}
        expandable={{
          expandedRowRender: (record) => (
            <TableError
             // @ts-ignore
              width="100%"
              columns={errorColumns}
              pagination={false}
              dataSource={record.errors}
            />
          ),
          expandRowByClick: true,
          indentSize: 0,
        }}
        loading={isLoading}
        pagination={{ ...pagination, showTotal: (total) => `总数：${total}` }}
        onChange={handleTableChange}
      />
    </Drawer>
  );
}


export default ImportRecordDrawer;
