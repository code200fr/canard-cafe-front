import React, { useEffect, useState } from "react";
import './App.css';
import { UserLookUp } from "./UserLookUp";
import { TopicLookUp } from "./TopicLookUp";


function App() {
  const [data, setData] = useState<string>();

  const onSearch = (query?: string) => {
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
      <div className="container">
        <header
          className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <a href="/" className="d-flex align-items-center col-md-3 text-dark text-decoration-none">
            <img src="https://forum.canardpc.com/images/misc/LogoCPC.png" className="App-logo" alt="logo" />
          </a>

          <ul className="nav col-12 col-md-auto gap-2">
            <li className="mr2"><UserLookUp onSearch={onSearch}></UserLookUp></li>
            <li><TopicLookUp onSearch={onSearch}></TopicLookUp></li>
          </ul>
        </header>
      </div>

      <div className="container">
        {data}
      </div>
    </div>
  );
}

export default App;
