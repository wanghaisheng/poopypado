import "styled-components/native";

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      main: string;
      emptyMain: string;
      grey: string;
      foreground: string;
      background: string;
      icon: string;
    };
  }
}
