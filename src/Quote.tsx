import React, { MouseEvent } from "react";
import { UserQuotes } from "./User";

export interface QuoteProps {
  quotes: UserQuotes;
  by: UserQuotes;
  username: string;
  onSearch: (query?: string) => void;
}

interface QuoteState {

}

export class Quote extends React.Component<QuoteProps, QuoteState> {
  constructor(props: QuoteProps) {
    super(props);
    this.state = {};

    this.openUser = this.openUser.bind(this);
  }

  openUser(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const anchor: HTMLAnchorElement = event.currentTarget;
    this.props.onSearch(anchor.dataset.username);
  }

  render() {
    const users: JSX.Element[] = [];
    const byUsers: JSX.Element[] = [];

    const addUser = (list: JSX.Element[], quote: { username: string; count: number }) => {
      list.push((
        <li key={quote.username} className="list-group-item">
          <a href="#user-loading" data-username={quote.username} className="text-secondary" onClick={this.openUser}>
            {quote.username}
          </a>
        </li>
      ))
    }

    this.props.quotes.forEach((quote: { username: string; count: number }) => {
      addUser(users, quote);
    });

    this.props.by.forEach((quote: { username: string; count: number }) => {
      addUser(byUsers, quote);
    });

    return (
      <div className="card">
        <h4 className="card-header">
          Quotes / Citations
        </h4>
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <h5 className="mb-3">{this.props.username} cite :</h5>
              <ol className="list-group list-group-numbered">
                {users}
              </ol>
            </div>
            <div className="col-6">
              <h5 className="mb-3">{this.props.username} est cité par :</h5>
              <ol className="list-group list-group-numbered">
                {byUsers}
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
}