import React from "react";
import {BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.scss";

import Index from "./components/index";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Index />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
