/* eslint-disable react/jsx-props-no-spreading */
import { Table } from 'antd';

interface Tablerops {
  columns: any[];
  dataSource?: any;
  [key: string]: any;
}

function MyTable({ columns, dataSource = [], ...rest }: Tablerops) {
  const { scroll, ...rests } = rest;
  const scrolls = {
    x: scroll?.x ? scroll?.x : null,
    y: scroll?.y || 500,
  };

  return (
    <Table
      bordered
      size="small"
      columns={columns}
      dataSource={dataSource}
      scroll={scrolls}
      {...rests}
    />
  );
}

export default MyTable;
