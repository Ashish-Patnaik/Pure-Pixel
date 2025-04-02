import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'; // Import brand icons

function Footer() {
  return (
    <footer>
      <div className="social-icons">
        <a href="https://github.com/Ashish-Patnaik" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a href="https://www.linkedin.com/in/ashishpatnaik2806/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a href="https://x.com/AshishPatnaik_" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
      </div>
      <p>Made with 💗 By Ashish Patnaik</p>
    </footer>
  );
}

export default React.memo(Footer);