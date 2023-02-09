import React, { useEffect, useState } from "react";
import './App.css';
import { UserLookUp } from "./UserLookUp";


function App() {
  const [data, setData] = useState<string>();

  const onSearch = (query?: string) => {
    console.log(query);
    if (query) {
      load(query);
    }
  }

  const load = (username: string) => {
    fetch(`/user/${username}/tokens`)
      .then((response) => response.json())
      .then((tokens: string[]) => setData(tokens.join(', ')));
  }

  useEffect(()=>{

  },[])

  return (
    <div className="App">
      <header className="App-header">
        <img src="https://forum.canardpc.com/images/misc/LogoCPC.png" className="App-logo" alt="logo" />
        <UserLookUp onSearch={onSearch}></UserLookUp>
        <div>{data}</div>
      </header>
    </div>
  );
}

export default App;
