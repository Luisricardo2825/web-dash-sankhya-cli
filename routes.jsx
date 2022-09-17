import * as React from "react";
import { Routes, Route } from "react-router-dom";
import App from "../pages/App";
import Teste from "../pages/Teste";

function Router(props) {
  console.log("Renderizou");
  return (
    <Routes>
      <Route path="/" element={<App {...props} />} />
      <Route path="/teste" element={<Teste {...props} />} />
    </Routes>
  );
}

export default Router;
