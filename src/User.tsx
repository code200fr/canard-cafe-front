import React from "react";
import './User.css';
import { WordCloud } from "./WordCloud";
import { Smileys } from "./smiley/Smileys";

export interface UserProps {
  entity?: UserEntity;
}

export interface UserEntity {
  id: number;
  name: string;
  url: string;
  title: string|undefined;
  avatar: string|undefined;
  tokens: UserTokens
  smileys: UserSmileys;
}

export type UserTokens = Array<{ token: string; freq: number }>;
export type UserSmileys = Array<{ smiley: string; count: number }>;

interface UserState {

}

export class User extends React.Component<UserProps, UserState> {
  constructor(props: UserProps) {
    super(props);
    this.state = {};
  }

  render() {
    if (!this.props.entity) {
      return '';
    }

    const entity: UserEntity = this.props.entity;
    let avatar;

    if (entity.avatar) {
      const avatarUrl: string = "https://forum.canardpc.com/" + entity.avatar;
      avatar = <img src={avatarUrl} className="user-avatar me-2" alt={entity.name} />
    }

    return (
      <main>
        <div className="d-flex align-items-center">
          {avatar}
          <h1 className="display-4">
            { entity.name }
            <small className="text-muted d-block user-title">{ entity.title }</small>
          </h1>
        </div>
        <div className="row mt-2">
          <div className="col-12 col-md-9">
            <WordCloud words={entity.tokens}></WordCloud>
          </div>
          <div className="col-12 col-md-3">
            <Smileys smileys={entity.smileys}></Smileys>
          </div>
        </div>
      </main>
    );
  }
}