import React from "react";
import './App.css';
import { UserLookUp } from "./UserLookUp";
import { User, UserEntity } from "./User";

export interface AppProps {}
export interface AppState {
  user?: UserEntity
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {};

    this.search = this.search.bind(this);
    this.load = this.load.bind(this);
  }

  search(query?: string) {
    if (query) {
      this.load(query);
    } else {
      this.setState({
        user: undefined
      });
    }
  }

  load(username: string) {
    fetch(`/user/${username}`)
      .then((response) => response.json())
      .then((user: UserEntity) => this.setState({
        user: user
      }));
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <header
            className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
            <a href="/" className="d-flex align-items-center col-md-3 text-dark text-decoration-none">
              <img src="https://forum.canardpc.com/images/misc/LogoCPC.png" className="App-logo" alt="logo" />
            </a>

            <ul className="nav col-12 col-md-auto gap-2">
              <li className="mr2"><UserLookUp onSearch={this.search}></UserLookUp></li>
            </ul>
          </header>
        </div>

        <div className="container">
          <User entity={this.state.user}></User>
        </div>
      </div>
    );
  }

}

export default App;
