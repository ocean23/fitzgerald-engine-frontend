import { useState, useEffect, useCallback } from 'react';
import { Table, Space, message, Button } from 'antd';

import { globalStyles } from '@styles/index';
import { httpRequest } from '@/utils';
import { useQuery } from 'react-query';
import SearchValueStore from './stores';
import Search from './search';
import StrategyModal from './strategyModal';
import ProcessInfoModal from './processInfoModal';

// import PropTypes from 'prop-types';

const { Content } = globalStyles;

function Strategy() {
  const [total, setTotal] = useState(0);
  const [searchCriteria, setSearchCriteria] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [strategyModalVal, setStrategyModalVal] = useState({});
  const search = { ...searchCriteria } as any;

  const columns:any[] = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: 100,
      render: (text, record, index) => index + 1,
      fixed: 'left',
    },
    {
      title: '流程名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '应用场景',
      dataIndex: 'sceneDesc',
      key: 'sceneDesc',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '状态',
      dataIndex: 'statusDesc',
      key: 'statusDesc',
    },
    {
      title: '最后操作时间',
      dataIndex: 'lastModifiedDate',
      key: 'lastModifiedDate',
    },
    {
      title: '操作人',
      dataIndex: 'lastModifiedName',
      key: 'lastModifiedName',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              onClick={() => {
                setStrategyModalVal(record);
                setIsOpen(true);
              }}
            >
              查看
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setIsInfoModalOpen(true);
              }}
            >
              编辑
            </Button>
          </Space>
        );
      },
    },
  ];

  const { isLoading, data, refetch } = useQuery(
    ['strategy-review', search],
    async () => {
      const res:any = await httpRequest.post('/strategyProcess/inquiry', search);
      if (res.code === 0) {
        SearchValueStore.setSearchValue(searchCriteria);
        setTotal(res.data.total);
        return res.data.content;
      }
      message.error(res.msg);
      return null;
    },
    {
      cacheTime: 0,
    }
  );

  const onClose = useCallback(
    (open?:boolean) => {
      setIsOpen(open);
      refetch();
    },
    [refetch]
  );

  const onCancelInfoModal = useCallback((open) => {
    setIsInfoModalOpen(open);
  }, []);
  useEffect(() => {
    if (Object.keys(SearchValueStore.searchValue).length) {
      setSearchCriteria({ ...SearchValueStore.searchValue });
    } else {
      setSearchCriteria({ pageSize: 10 });
    }
  }, []);

  const handleTableChange = (params) => {
    setSearchCriteria({
      ...searchCriteria,
      ...params,
      pageNumber: params.current - 1,
    });
  };

  const handleAddClick = () => {
    setIsOpen(true);
  };

  const handleSearch = (searchParams?:any) => {
    setSearchCriteria({
      pageNumber: 0,
      current: 1,
      ...searchCriteria,
      ...searchParams,
      timestamp: new Date().getTime(),
    });
  };

  return (
    <>
      <Content>
        <Search onSubmit={handleSearch} handleAddClick={handleAddClick} />
      </Content>
      <Content>
        <Table
          loading={isLoading}
          dataSource={data}
          columns={columns}
          onChange={handleTableChange}
          pagination={{
            showSizeChanger: true,
            total,
            showTotal: () => `总数：${total}`,
          }}
        />
      </Content>
      <StrategyModal
        isOpen={isOpen}
        onClose={onClose}
        strategyModalVal={strategyModalVal}
      />
      <ProcessInfoModal
        isInfoModalOpen={isInfoModalOpen}
        onCancelInfoModal={onCancelInfoModal}
      />
    </>
  );
}

export default Strategy;
