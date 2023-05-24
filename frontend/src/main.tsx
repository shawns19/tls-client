import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import { App } from "./App";
import { ChakraProvider, extendTheme, Flex } from "@chakra-ui/react";
import { themeColors } from "./theme";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const container = document.getElementById("root");
export const theme = extendTheme({
  colors: themeColors,
});
const root = createRoot(container!);

root.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </ChakraProvider>
);
