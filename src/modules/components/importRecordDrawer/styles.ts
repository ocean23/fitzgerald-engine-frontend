import styled from 'styled-components';
import { Table } from 'antd';

export const TableError = styled(Table)`
  .ant-table {
    border: 1px solid #ffdada;
  }
  .ant-table-thead > tr > th {
    background-color: #ffeded;
    color: #ff4d4f;
    border-bottom: none;
  }
  .ant-table-tbody > tr {
    border-top: 1px solid #ffdada;
  }
  .ant-table-tbody > tr > td {
    color: #ff5050;
    border-top: 1px solid #ffdada;
  }
  tr > .ant-table-expanded-row > td {
    background: #ffffff;
  }
  .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(
      .ant-table-row-expand-icon-cell
    ):not([colspan])::before {
    height: 0;
  }
  .ant-table-row-expand-icon-cell {
    .ant-table-row-expand-icon {
      visibility: hidden;
    }
  }
`;
export const TableRecord = styled(Table)`
  .ant-table.ant-table-small
    .ant-table-tbody
    .ant-table-wrapper:only-child
    .ant-table {
    margin: -8px -8px -8px 0px;
  }
  .ant-table-tbody > .ant-table-expanded-row {
    border: none;
  }
  .ant-table-cell {
    .ant-table-row-expand-icon-cell {
      display: none;
    }
  }
  .ant-table-row-expand-icon-cell {
    .ant-table-row-expand-icon {
      visibility: hidden;
    }
  }
`;
export default {};
