import styled from 'styled-components';
import { Button } from 'antd';

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const LogoutButton = styled(Button)`
  &:hover,
  &:focus {
    background-color: transparent;
  }
  &:hover {
    color: #1890ff;
  }
`;

export default {};
