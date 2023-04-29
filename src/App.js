import React from 'react';
import { BrowserRouter as Router, Route, Link, Outlet, Routes } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ChakraProvider,
  Container,
  extendTheme,
  Flex,
  Input,
  Spinner,
} from "@chakra-ui/react";
import Recommender from './demos/recommender/Recommender';
import VisualSearch from './demos/visual-search/VisualSearch';
import TraitSearch from './demos/trait-search/TraitSearch';

// TODO: Set using env vars
export const CDN_URL_BASE_PATH = "https://staging-cdn.onaji.io/";

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
        minW={"8xl"}
        paddingBottom={16}
        paddingLeft={0}
        paddingRight={0}
      >
    <Router>
      <div>
        <nav>
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
        </nav>

        <Routes>
          <Route path="/demo/recommender" element={<Recommender />} />
          <Route path="/demo/visual-search" element={<VisualSearch />} />
          <Route path="/demo/trait-search" element={<TraitSearch />} />
        </Routes>
      </div>
    </Router>
    </Container>
    </ChakraProvider>
  );
}

export default App;
