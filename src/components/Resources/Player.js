import React from 'react';
import ReactPlayer from 'react-player';

export default function Player() {
  return (
    <div className="player-wrapper">
      <ReactPlayer
        className="player"
        url="https://www.youtube.com/watch?v=ciUniZGD4tY&feature=emb_logo"
      />
      <ReactPlayer
        className="player"
        url="https://www.youtube.com/watch?time_continue=22&v=adB8RW4I3o4&feature=emb_logo"
      />
    </div>
  );
}
