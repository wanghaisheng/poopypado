import styled from "styled-components/native";

export const Spacer = styled.View<{ size: string }>`
  margin-top: ${(p) => p.size + "px"};
`;
