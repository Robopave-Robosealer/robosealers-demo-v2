import ReactDOM from "react-dom/client";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "./main.css";
import { RouterProvider } from "react-router-dom";
import { allRouters } from "./router.tsx";
import {
  ColorSchemeScript,
  DirectionProvider,
  MantineProvider,
} from "@mantine/core";
import { Provider } from "react-redux";
import { store } from "../store/store.ts";
import { ModalsProvider } from "@mantine/modals";

const router = allRouters;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Provider store={store}>
      <ColorSchemeScript forceColorScheme="light" />
      <DirectionProvider>
        <MantineProvider
          theme={{
            primaryColor: "cyan",
            colors: {
              cyanColor: [
                "#e3feff",
                "#d2f8fa",
                "#a8eff2",
                "#7be5ea",
                "#58dde4",
                "#42d8e0",
                "#31d6de",
                "#1dbdc6",
                "#00a9b0",
                "#00939a",
              ],
            },
          }}
        >
          <ModalsProvider>
            <RouterProvider router={router} />
          </ModalsProvider>
        </MantineProvider>
      </DirectionProvider>
    </Provider>
  </>
);
