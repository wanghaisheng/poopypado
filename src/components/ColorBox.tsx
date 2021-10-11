import styled from "styled-components/native";

export const ColorBox = styled.View<{ backgroundColour: string }>`
  background: ${(p) => p.backgroundColour};
  height: 40px;
  width: 40px;
  border-style: solid;
  border-radius: 2px;
`;
