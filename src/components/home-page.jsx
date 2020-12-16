import HpSheet from "./hp-sheet";
import React from "react";
import Helmet from "react-helmet";

function HomePage() {
  return (
    <>
      <Helmet title="Cluedo" />
      <HpSheet />
    </>
  );
}

export default HomePage;
