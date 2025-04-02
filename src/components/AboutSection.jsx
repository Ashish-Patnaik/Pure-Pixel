import React from 'react';

function AboutSection() {
  return (
    <section id="about-section">
      <div className="about-content">
        <h2>Peel Your Background</h2>
        <p>PurePixel: Instantly remove image backgrounds for free! Upload your photo and watch as PurePixel magically peels away the background, leaving you with a clean, transparent image ready to use.</p>
        <p>Perfect for product photos, profile pictures, marketing materials, and more. No design skills or software required!</p>
      </div>
    </section>
  );
}

export default React.memo(AboutSection);