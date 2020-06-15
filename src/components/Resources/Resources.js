import React from 'react';
import Player from './Player';
import './Resources.css';

export default function Resources() {
  return (
    <div className="resources">
      <div>
        
      </div>
      <h2>How to properly wear face masks:</h2>
      <Player />
      <h2>
        <a
          className="resource-link"
          href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019"
        >
          &rarr; Click here for more information on the novel coronavirus
        </a>
      </h2>
    </div>
  );
}
