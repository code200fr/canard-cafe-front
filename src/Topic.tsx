import React from "react";
import { UserTopics } from "./User";

export interface TopicProps {
  topics: UserTopics;
}

interface TopicState {

}

export class Topic extends React.Component<TopicProps, TopicState> {
  constructor(props: TopicProps) {
    super(props);
    this.state = {};
  }

  render() {
    const topics: JSX.Element[] = [];

    this.props.topics.forEach((topic: { id: number; name: string; count: number }) => {
      topics.push(<li key={topic.id} className="list-group-item">{topic.name}</li>);
    });

    return (
      <div className="card">
        <h4 className="card-header">
          Topics principaux
        </h4>
        <div className="card-body">
          <ol className="list-group list-group-numbered">
            {topics}
          </ol>
        </div>
        <div className="card-footer text-muted">
          <small>
            Uniquement parmi les topics traités
          </small>
        </div>
      </div>
    );
  }
}