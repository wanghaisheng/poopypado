import styled from "styled-components/native";

export const Card = styled.View`
  border-radius: 10px;
  margin: 8px 12px 0 12px;
  padding: 17px 20px;
  background: ${(p) => p.theme.color.foreground};
`;
