import React from 'react';
import { SmileyList } from './SmileyList';
import './Smileys.css';
import { UserSmiley } from '../user/User';

export interface SmileysProps {
  smileys: UserSmiley[];
}

type WithUrl = {
  url?: string;
};

type UserSmileyWithUrl = UserSmiley & WithUrl;

interface SmileysState {}

export class Smileys extends React.Component<SmileysProps, SmileysState> {
  constructor(props: SmileysProps) {
    super(props);

    this.getDisplayList = this.getDisplayList.bind(this);
  }

  protected getDisplayList(): UserSmiley[] {
    let smiles: UserSmileyWithUrl[] = [...this.props.smileys];
    smiles = smiles.slice(0, 15);

    smiles.forEach((smile: UserSmileyWithUrl) => {
      if (SmileyList.hasOwnProperty(smile.smiley)) {
        smile.url = SmileyList[smile.smiley];
      }
    });

    return smiles;
  }

  render() {
    const listElements: JSX.Element[] = [];
    const smileys: UserSmileyWithUrl[] = this.getDisplayList();

    smileys.forEach((smiley: UserSmileyWithUrl, index: number) => {
      let image: JSX.Element = <span>{smiley.smiley}</span>;
      let className: string =
        'd-flex justify-content-between align-items-center list-group-item';

      if (smiley.url) {
        image = <img src={smiley.url} alt={smiley.smiley} />;
      }

      if (index === 0) className += ' first';
      if (index === 1) className += ' second';
      if (index === 2) className += ' third';

      listElements.push(
        <li className={className} key={index}>
          {image}
          <span className="badge bg-secondary rounded-pill">
            {smiley.percent}%
          </span>
        </li>,
      );
    });

    return (
      <div className="card">
        <h4 className="card-header">Smileys</h4>
        <div className="card-body">
          <div className="list-group smiley-list">{listElements}</div>
        </div>
      </div>
    );
  }
}
