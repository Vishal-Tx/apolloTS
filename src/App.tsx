import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { Home, Info } from "./components";
import "./App.css";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com",
  cache: new InMemoryCache(),
});

const App: React.FunctionComponent = () => {
  return (
    <div className="app">
      <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:search" element={<Info />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </div>
  );
};

export default App;
