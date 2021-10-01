import "styled-components/native";

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      main: string;
      foreground: string;
      background: string;
      icon: string;
    };
  }
}
