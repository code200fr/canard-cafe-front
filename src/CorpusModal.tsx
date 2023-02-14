import React from "react";
import { Modal } from "bootstrap";

export interface CorpusModalProps {
  open: boolean;
}

interface CorpusModalState {
  topics: Topics;
}

type Topics = Array<Topic>
type Topic = {
  id: number;
  title: string;
};

export class CorpusModal extends React.Component<CorpusModalProps, CorpusModalState> {
  protected modal?: Modal;

  constructor(props: CorpusModalProps) {
    super(props);

    this.state = {
      topics: []
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

    const corpusModalDiv: HTMLDivElement = document.getElementById('corpus-modal') as HTMLDivElement;
    this.modal = new Modal(corpusModalDiv);

    corpusModalDiv.addEventListener('show.bs.modal', () => {
      fetch('/topic/list')
        .then((response: Response) => response.json())
        .then((topics: Topics) => {
          this.setState({
            topics: topics
          })
        })
    }, {
      once: true
    });
  }

  render() {
    let content: JSX.Element[] = [<li className="list-group-item list-group-item-light">Chargement...</li>];
    let count: number = 0;

    if (this.state.topics) {
      content = [];

      this.state.topics.forEach((topic: Topic) => {
        content.push(<li key={topic.id} className="list-group-item">{topic.title}</li>);
      });

      count = this.state.topics.length;
    }

    return (
      <div className="modal fade" id="corpus-modal">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Corpus de données · {count} topics</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <ul className="list-group">
                {content}
              </ul>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}