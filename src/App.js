import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Navigate,
  Routes,
} from "react-router-dom";
import {
  ChakraProvider,
  Container,
  extendTheme,
  Input,
  Button,
} from "@chakra-ui/react";
import Recommender from "./demos/recommender/Recommender";
import VisualSearch from "./demos/visual-search/VisualSearch";
import TraitSearch from "./demos/trait-search/TraitSearch";

export const CDN_URL_BASE_PATH = "https://cdn.onaji.io/";

function App() {
  const theme = extendTheme({
    styles: {
      global: {
        "html, body": {
          color: "black",
        },
      },
    },
  });
  return (
    <ChakraProvider theme={theme}>
      <Container
        maxW={["container.sm", "container.md", "container.lg", "135ch"]}
        paddingBottom={16}
        paddingLeft={0}
        paddingRight={0}
      >
        <Router>
          <div>
            {/* activate once visual and trait search demos are ready */}
            {/* <nav>
              <ul>
                <li>
                  <Link to="/demo/recommender">Recommender</Link>
                </li>
                <li>
                  <Link to="/demo/visual-search">Visual Search</Link>
                </li>
                <li>
                  <Link to="/demo/trait-search">Trait Search</Link>
                </li>
              </ul>
            </nav> */}

            <Routes>
              <Route path="/recommender" element={<Recommender />} />
              <Route path="/visual-search" element={<VisualSearch />} />
              <Route path="/ai-trait-search" element={<TraitSearch />} />
              {/* Automatically route to the recommender demo for now */}
              <Route path="/" element={<Navigate to="/recommender" />} />
              <Route
                path="*"
                element={<Navigate to="/recommender" replace />}
              />
            </Routes>
          </div>
        </Router>
      </Container>
    </ChakraProvider>
  );
}

export default App;
