import React from 'react';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';

export interface GraphProps {}

interface GraphState {
  statistics?: Statistics;
}

interface Statistics {
  topics: number;
  users: number;
  posts: number;
  quotes: number;
  smiley: number;
}

export class UsersGraph extends React.Component<GraphProps, GraphState> {
  protected loaded: boolean = false;

  constructor(props: GraphProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.loaded) {
      return;
    }

    this.loaded = true;

    fetch('topic/stats')
      .then((response: Response) => response.json())
      .then((stats: Statistics) => {
        this.setState({
          statistics: stats,
        });
      });
  }

  render() {
    let stats: JSX.Element = <span></span>;

    if (this.state.statistics) {
      const s: Statistics = this.state.statistics;

      stats = (
        <p className="text-center">
          Analyse de <strong>{s.posts} messages</strong> dans{' '}
          <strong>{s.topics} topics</strong>&nbsp; par{' '}
          <strong>{s.users} canards</strong>, avec {s.quotes} quotes et{' '}
          {s.smiley} smileys.
        </p>
      );
    }

    return (
      <div>
        {stats}
        <InnerImageZoom
          src="community.jpg"
          zoomSrc="community-large.jpg"
          zoomType="hover"
        />
      </div>
    );
  }
}
