import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Navigate,
  Routes,
} from "react-router-dom";
import {
  Button,
  ChakraProvider,
  Container,
  extendTheme,
  Input,
} from "@chakra-ui/react";
import Recommender from "./demos/recommender/Recommender";
import VisualSearch from "./demos/visual-search/VisualSearch";
import TraitSearch from "./demos/trait-search/TraitSearch";

// TODO: Set using env vars
export const CDN_URL_BASE_PATH = "https://cdn.onaji.io/";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  // TODO: Figure out a more convenient way to do auth
  const login = async (username, password) => {
    const data = new URLSearchParams();
    data.append("username", username);
    data.append("password", password);
    return fetch(`https://staging-api.onaji.io/v1/auth/login`, {
      credentials: "include",
      method: "post",
      body: data,
    });
  };
  const loginSubmitHandler = async () => {
    if (!username || !password) {
      return;
    }
    const res = await login(username, password);

    if (res.status !== 200) {
      setIsAuthorized(false);
    } else {
      console.log("success");
      setIsAuthorized(true);
    }
  };

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
            {!isAuthorized && (
              <div>
                username:{" "}
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      loginSubmitHandler();
                    }
                  }}
                />
                password:{" "}
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      loginSubmitHandler();
                    }
                  }}
                />
                <Button
                  bgColor="#1B1919"
                  color="white"
                  border="1px solid #4B4B4B"
                  ml={3}
                  onClick={() => loginSubmitHandler()}
                >
                  Login
                </Button>
              </div>
            )}
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
              <Route path="/demo/recommender" element={<Recommender />} />
              <Route path="/demo/visual-search" element={<VisualSearch />} />
              <Route path="/demo/trait-search" element={<TraitSearch />} />
              {/* Automatically route to the recommender demo for now */}
              <Route path="/" element={<Navigate to="/demo/recommender" />} />
            </Routes>
          </div>
        </Router>
      </Container>
    </ChakraProvider>
  );
}

export default App;
