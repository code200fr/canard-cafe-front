import React from "react";
import { UserQuotes } from "./User";

export interface QuoteProps {
  quotes: UserQuotes;
  by: UserQuotes;
  username: string;
}

interface QuoteState {

}

export class Quote extends React.Component<QuoteProps, QuoteState> {
  constructor(props: QuoteProps) {
    super(props);
    this.state = {};
  }

  render() {
    const users: JSX.Element[] = [];
    const byUsers: JSX.Element[] = [];

    this.props.quotes.forEach((quote: { username: string; count: number }) => {
      users.push(<li key={quote.username} className="list-group-item">{quote.username}</li>);
    });

    this.props.by.forEach((quote: { username: string; count: number }) => {
      byUsers.push(<li key={quote.username} className="list-group-item">{quote.username}</li>);
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