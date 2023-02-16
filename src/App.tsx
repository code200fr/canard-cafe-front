import React from 'react';
import { UserLookUp } from './user/UserLookUp';
import { User, UserEntity } from './user/User';
import { CorpusModal } from './CorpusModal';
import { Footer } from './Footer';
import { EventDispatcher } from './EventDispatcher';
import { AppEvents } from './AppEvents';
import { AboutModal } from './AboutModal';

export interface AppProps {}
export interface AppState {
  user?: UserEntity;
  corpusOpen: boolean;
  aboutOpen: boolean;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      corpusOpen: false,
      aboutOpen: false,
    };

    this.search = this.search.bind(this);
    this.load = this.load.bind(this);
    this.openCorpusModal = this.openCorpusModal.bind(this);
    this.onCloseCorpusModal = this.onCloseCorpusModal.bind(this);
    this.openAboutModal = this.openAboutModal.bind(this);
    this.onCloseAboutModal = this.onCloseAboutModal.bind(this);
    this.goHome = this.goHome.bind(this);

    EventDispatcher.on(AppEvents.OpenCorpus, this.openCorpusModal);
    EventDispatcher.on(AppEvents.OpenAbout, this.openAboutModal);
  }

  goHome() {
    this.setState({
      user: undefined,
    });
  }

  openCorpusModal() {
    this.setState({
      corpusOpen: true,
    });
  }

  onCloseCorpusModal() {
    this.setState({
      corpusOpen: false,
    });
  }

  openAboutModal() {
    this.setState({
      aboutOpen: true,
    });
  }

  onCloseAboutModal() {
    this.setState({
      aboutOpen: false,
    });
  }

  search(query?: string) {
    if (query) {
      this.load(query);
    } else {
      this.setState({
        user: undefined,
      });
    }
  }

  load(username: string) {
    fetch(`/user/${username}`)
      .then((response) => response.json())
      .then((user: UserEntity) => {
        this.setState({
          user: user,
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
            <a
              href="#home"
              className="d-flex align-items-center col-md-3 text-dark text-decoration-none"
              onClick={this.goHome}
            >
              <img
                src="https://forum.canardpc.com/images/misc/LogoCPC.png"
                className="App-logo"
                alt="logo"
              />
            </a>

            <ul className="nav col-12 col-md-auto gap-2">
              <li className="m-auto mt-3">
                <UserLookUp onSearch={this.search}></UserLookUp>
              </li>
            </ul>
          </header>
        </div>

        <div className="container">
          <User entity={this.state.user} onSearch={this.search}></User>
        </div>

        <div className="container">
          <Footer></Footer>
        </div>

        <CorpusModal
          open={this.state.corpusOpen}
          onClose={this.onCloseCorpusModal}
        ></CorpusModal>

        <AboutModal
          open={this.state.aboutOpen}
          onClose={this.onCloseAboutModal}
        ></AboutModal>
      </div>
    );
  }
}

export default App;
