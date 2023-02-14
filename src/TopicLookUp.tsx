import React, { ChangeEvent, FormEvent } from 'react';
import './Autocomplete.css';

export interface TopicLookUpProps {
  query?: string;
  onSearch: (query?: string) => void;
}

interface TopicLookUpState {
  query?: string;
}

export class TopicLookUp extends React.Component<
  TopicLookUpProps,
  TopicLookUpState
> {
  constructor(props: TopicLookUpProps) {
    super(props);
    this.state = { query: props.query ?? '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.props.onSearch(this.state.query);
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ query: event.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="search">
        <div className="form-floating">
          <input
            type="search"
            className="form-control"
            id="topic-search"
            placeholder="Topic..."
            value={this.state.query}
            onChange={this.handleChange}
          />
          <label htmlFor="floatingInput">Rechercher un topic</label>
        </div>
      </form>
    );
  }
}
