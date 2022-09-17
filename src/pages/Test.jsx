import React from "react";

export default function Test(props) {
  const { executeQuery, openApp, refreshDetails, openLevel, openPage } = props;
  return <div>Pagina:Test</div>;
}

//  regesx tags: (<.[^(><.)]+>)
// nome função+props: (Test\(({([A-Za-z]:[A-Za-z])})\))
// Props: (\(({([A-Za-z]:[A-Za-z])})\))
