import styled from 'styled-components';
import { Layout, Button, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

export const StyledLayout = styled(Layout)`
  height: 100vh;
  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
  }
  .menu {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }
`;

export const Logo = styled(Link)`
  position: relative;
  display: block;
  height: 64px;
  border-right: 1px solid #f0f0f0;
  h1 {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    padding: 0 20px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }
  img + h1 {
    visibility: hidden;
  }
  img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 75%;
    max-height: 70%;
    background-color: #fff;
  }
`;

export const StyledHeader = styled(Layout.Header)`
  background-color: #fff !important;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
  padding-right: 24px;
  .header {
    flex: 1;
  }
`;

export const MenuCollapsedButton = styled(Button)`
  position: absolute;
  left: 100%;
  height: 64px;
  font-size: 18px;
  &:hover,
  &:focus {
    background-color: transparent;
  }
  &:hover {
    color: #1890ff;
  }
`;

export const StyledContent = styled(Layout.Content)`
  overflow: auto;
  padding: 12px 12px 0;
`;

export const StyledBreadcrumb = styled(Breadcrumb)`
  padding: 12px;
  background-color: #fff;
`;

export default {};
