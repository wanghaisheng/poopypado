import React, { FC } from "react";
import styled from "styled-components/native";

interface Props {}

export const Header: FC<Props> = (props) => {
  const { children } = props;
  return <Container>{children}</Container>;
};

const Container = styled.View`
  flex-flow: row;
  align-items: baseline;
  justify-content: space-between;
  padding: 48px 20px 17px;
  background: white;
`;
