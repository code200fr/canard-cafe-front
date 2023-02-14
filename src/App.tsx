import React from "react";
import './App.css';
import { UserLookUp } from "./UserLookUp";
import { User, UserEntity } from "./User";
import { CorpusModal } from "./CorpusModal";

export interface AppProps {}
export interface AppState {
  user?: UserEntity;
  corpusOpen: boolean;
}

class App extends React.Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);

    this.state = {
      corpusOpen: false
    };

    this.search = this.search.bind(this);
    this.load = this.load.bind(this);
    this.openCorpusModal = this.openCorpusModal.bind(this);
  }

  openCorpusModal() {
    this.setState({
      corpusOpen: true
    })
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

        <div className="container">
          <footer className="py-3 my-4">
            <ul className="nav justify-content-center border-bottom pb-3 mb-3">
              <li className="nav-item"><a href="https://forum.canardpc.com/" className="nav-link px-2 text-muted" target="_blank" rel="noreferrer">Communauté</a></li>
              <li className="nav-item"><a href="#" className="nav-link px-2 text-muted" onClick={this.openCorpusModal}>Corpus</a></li>
              <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">À propos</a></li>
              <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Github</a></li>
              <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Données personnelles</a></li>
            </ul>
            <p className="text-center text-muted">Réalisé par Jonathan P. · Code 200</p>
          </footer>
        </div>
        <CorpusModal open={this.state.corpusOpen}></CorpusModal>
      </div>
    );
  }

}

export default App;
