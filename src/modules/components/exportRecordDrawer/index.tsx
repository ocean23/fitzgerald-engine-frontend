/* eslint-disable consistent-return */
/* eslint-disable prefer-template */
import  { useState, useEffect, useRef,Fragment } from 'react';
import { Drawer, Popover, Progress, message, Button } from 'antd';
import type { TableProps } from 'antd';
import { useQuery } from 'react-query';
import * as dayjs from 'dayjs';
import { Table } from '@/components/';
import { httpRequest } from '@/utils';
import { datetimeFormat } from '@/constants';

const columns:TableProps<any>['columns'] = [
  {
    title: '任务ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '导出时间',
    dataIndex: 'timestamp',
    key: 'timestamp',
    render: (text, record) =>
      record.timestamp
        ? dayjs(record.timestamp).format(datetimeFormat.dateTime)
        : '',
  },
  {
    title: '查询条件',
    dataIndex: 'searchShort',
    key: 'searchShort',
    width: 150,
    render: (text, record) => {
      if (text) {
        return (
          <Popover
            content={record.search?.map((s, index:any) => (
              <Fragment key={ index }>{s}；</Fragment>
            ))}
          >
            {text}
          </Popover>
        );
      }
      return '';
    },
  },
  {
    title: '导出进度',
    dataIndex: 'status',
    key: 'status',
    width: 150,
    render: (status, record) => {
      switch (status) {
        case 'success':
          return <Progress percent={100} />;
        case 'failure':
          return (
            <Progress
              percent={Math.ceil(record.progress * 100)}
              status="exception"
            />
          );
        default:
          return (
            <Progress
              percent={Math.ceil(record.progress * 100)}
              status="active"
            />
          );
      }
    },
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    render: (value, record) =>
      record?.url && (
        <Button type="link" href={record?.url}>
          下载到本地
        </Button>
      ),
  },
];


interface ExportRecordDrawerProps {
  open?: boolean;
  type: string;
  searchCriteria?: any[];
  onClose?: () => void;
}

function ExportRecordDrawer({
  open = false,
  type,
  searchCriteria = [],
  onClose = () => {},
}:ExportRecordDrawerProps) {
  const [pagination, setPagination] = useState({
    pageNumber: 0,
    pageSize: 15,
    total: 0,
  });
  const timer:any = useRef(null) ;

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
    const res = await httpRequest.post('/common/syncExport/tasks', {
      type,
      ...pagination,
    });
    setPagination({
      ...pagination,
      pageNumber: res?.data?.pageNumber,
      pageSize: res?.data?.pageSize,
      total: res?.data?.total,
    });
    const records = res.data?.content?.map((r) => {
      const search = searchCriteria
        ?.map((s) => {
          const content = s?.render ? s.render(r?.search) : r?.search?.[s?.key];
          return content ? (s?.label || '') + ':' + content : '';
        })
        .filter((s) => !!s);
      const searchShort = search?.join('；');
      return {
        ...r,
        search,
        searchShort:
          searchShort?.length > 15
            ? searchShort.substr(0, 15) + '...'
            : searchShort,
      };
    });

    return records;
  };

  const { isLoading, error, data, refetch }:{
    isLoading:boolean,
    [key:string]:any
  } = useQuery(
    ['exportTask', pagination, open],
    getData
  );
  useEffect(() => {
    if (error) {
      message.error(error?.message);
    }
  }, [error]);

  useEffect(() => {
    if (open && data) {
      timer.current = setInterval(refetch, 1000);
    }
    return () => {
      clearInterval(timer.current);
    };
  }, [open, data, refetch]);

  return (
    <Drawer open={open} title="导出记录" onClose={onClose} width="800">
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pagination={{ ...pagination, showTotal: (total) => `总数：${total}` }}
        onChange={handleTableChange}
      />
    </Drawer>
  );
}



export default ExportRecordDrawer;
