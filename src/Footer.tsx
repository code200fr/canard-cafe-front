import React from 'react';
import { EventDispatcher } from './EventDispatcher';
import { AppEvents } from './AppEvents';

export interface FooterProps {}

interface FooterState {}

export class Footer extends React.Component<FooterProps, FooterState> {
  constructor(props: FooterProps) {
    super(props);

    this.state = {};
  }

  openCorpusModal() {
    EventDispatcher.emit(AppEvents.OpenCorpus);
  }

  render() {
    return (
      <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
            <a
              href="https://forum.canardpc.com/"
              className="nav-link px-2 text-muted"
              target="_blank"
              rel="noreferrer"
            >
              Communauté
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#corpus"
              className="nav-link px-2 text-muted"
              onClick={this.openCorpusModal}
            >
              Corpus
            </a>
          </li>
          <li className="nav-item">
            <a href="#about" className="nav-link px-2 text-muted">
              À propos
            </a>
          </li>
          <li className="nav-item">
            <a
              href="https://github.com/code200fr/canard-cafe-front"
              className="nav-link px-2 text-muted"
            >
              Github Frontend
            </a>
          </li>
          <li className="nav-item">
            <a
              href="https://github.com/code200fr/canard-cafe"
              className="nav-link px-2 text-muted"
            >
              Github Backend
            </a>
          </li>
          <li className="nav-item">
            <a href="#rgpd" className="nav-link px-2 text-muted">
              Données personnelles
            </a>
          </li>
        </ul>
        <p className="text-center text-muted">
          <a
            href="https://github.com/code200fr"
            className="nav-link text-muted"
          >
            Réalisé par Jonathan P. · Code 200
          </a>
        </p>
      </footer>
    );
  }
}
