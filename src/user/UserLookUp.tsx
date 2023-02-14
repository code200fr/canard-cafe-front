import React, { ChangeEvent, FormEvent, MouseEvent } from 'react';
import '../Autocomplete.css';

export interface UserLookUpProps {
  query?: string;
  onSearch: (query?: string) => void;
}

interface UserLookUpState {
  query?: string;
  autocomplete?: string[];
}

export class UserLookUp extends React.Component<
  UserLookUpProps,
  UserLookUpState
> {
  constructor(props: UserLookUpProps) {
    super(props);
    this.state = {
      query: props.query ?? '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAutocompletePick = this.handleAutocompletePick.bind(this);
  }

  autocomplete(q: string) {
    fetch('/user/search?q=' + q)
      .then((response: Response) => response.json())
      .then((usernames: string[]) => {
        this.setState({
          autocomplete: usernames,
        });
      });
  }

  dispatchSearch(username?: string) {
    this.setState({
      autocomplete: [],
      query: username,
    });

    if (username) {
      this.props.onSearch(username);
    }
  }

  handleAutocompletePick(event: MouseEvent<HTMLButtonElement>) {
    const anchor: HTMLButtonElement = event.currentTarget;
    this.dispatchSearch(anchor.dataset.username);
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.dispatchSearch(this.state.query);
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ query: event.target.value });
    this.autocomplete(event.target.value);
  }

  render() {
    const autocomplete = this.state.autocomplete;
    let list;

    if (autocomplete?.length) {
      list = (
        <ul className="list-group autocomplete">
          {autocomplete.map((username: string) => (
            <button
              key={username}
              onClick={this.handleAutocompletePick}
              className="list-group-item list-group-item-action"
              data-username={username}
            >
              {username}
            </button>
          ))}
        </ul>
      );
    }

    return (
      <form onSubmit={this.handleSubmit} className="search">
        <div className="form-floating">
          <input
            type="search"
            className="form-control"
            id="user-search"
            placeholder="Canard..."
            value={this.state.query}
            onChange={this.handleChange}
            autoComplete="off"
          />
          <label htmlFor="floatingInput">Rechercher un canard</label>
        </div>
        {list}
      </form>
    );
  }
}
