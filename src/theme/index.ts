import { extendTheme, withDefaultProps } from "@chakra-ui/react";

const theme = extendTheme(
  {
    styles: {
      global: () => ({
        body: {
          bg: "",
        },
        h1: {
          fontSize: "xl",
        },
      }),
    },
  },
  withDefaultProps({
    defaultProps: {
      colorScheme: "gray",
      size: "md",
    },
    components: ["Button"],
  }),
);

export default theme;
