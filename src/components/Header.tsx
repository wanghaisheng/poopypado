import React, { FC } from "react";
import styled from "styled-components/native";

interface Props {}

export const Header: FC<Props> = (props) => {
  const { children } = props;
  return <Container>{children}</Container>;
};

const Container = styled.View`
  flex-flow: row;
  justify-content: space-between;
  align-items: baseline;

  padding: 48px 20px 0px;
  height: 90px;
  background: ${(p) => p.theme.color.foreground};
`;
