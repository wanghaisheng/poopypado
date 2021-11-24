import styled from "styled-components/native";

interface Props {
  type: string;
}

/**
 * Use this instead of native `Text` component for consistent font family.
 *
 * Available fonts are imported in `useCustomFonts` hook
 */
export const SettingTextStyle = styled.Text<Props>`
  font-family: ${(p) => getFontFamily(p.type)};
  color: #373737;
  font-size: 14px;
`;

const getFontFamily = (type: string): string => {
  /* (weight) {
    case 100:
      return "Roboto_100Thin";
    case 300:
      return "Roboto_300Light";
    case 400:
      return "Roboto_400Regular";
    case 500:
      return "Roboto_500Medium";
    case 700:
      return "Roboto_700Bold";
    case 900:
      return "Roboto_900Black";
  }*/
  if (type === "Instruction") {
    return "Roboto_500Medium";
  }
  if (type === "AmountSliderText") {
    return "Roboto_500Medium";
  } else {
    return "Roboto_400Regular";
  }
};
