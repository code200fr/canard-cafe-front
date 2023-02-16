import React from 'react';
import { Modal } from 'bootstrap';

export interface AboutModalProps {
  open: boolean;
  onClose: Function;
}

interface AboutModalState {}

export class AboutModal extends React.Component<
  AboutModalProps,
  AboutModalState
> {
  protected modal?: Modal;

  constructor(props: AboutModalProps) {
    super(props);

    this.state = {
      topics: [],
    };
  }

  componentDidUpdate() {
    if (this.props.open && this.modal) {
      this.modal.show();
    }
  }

  componentDidMount() {
    if (this.modal) {
      return;
    }

    const corpusModalDiv: HTMLDivElement = document.getElementById(
      'about-modal',
    ) as HTMLDivElement;

    this.modal = new Modal(corpusModalDiv);

    corpusModalDiv.addEventListener('hidden.bs.modal', () => {
      this.props.onClose();
    });
  }

  render() {
    return (
      <div className="modal fade" id="about-modal">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">À propos</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Ce projet à été réalisé entièrement par Code 200 / Awake /
                Jonathan pour la communauté Canard PC.
              </p>
              <p>
                Les technologies suivantes ont été utilisées dans ce projet :
                <code className="ms-2">
                  NestJS, React, Mongo, Mongoose, Docker, TypeScript, AWS, Gephi
                </code>
              </p>
              <p>
                Le code source, aussi bien front que back, est{' '}
                <a href="https://github.com/code200fr">disponible sur github</a>
                .
              </p>
              <p>Ce site n'utilise pas de cookies ou de trackers.</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
