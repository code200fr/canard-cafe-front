import React, { ChangeEvent, FormEvent } from "react";

export interface UserLookUpProps {
  query?: string;
  onSearch: (query?: string) => void;
}

interface UserLookUpState {
  query?: string;
}

export class UserLookUp extends React.Component<UserLookUpProps, UserLookUpState> {
  constructor(props: UserLookUpProps) {
    super(props);
    this.state = {query: props.query ?? ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.props.onSearch(this.state.query);
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({query: event.target.value});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.query} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}