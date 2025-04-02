import React, { useEffect, useRef } from 'react';

function HeroSection() {
  const articleRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (articleRef.current) {
        const { clientX, clientY } = event;
        const { left, top, width, height } = articleRef.current.getBoundingClientRect();
        // Normalize coordinates to -1 to 1 range relative to the article center
        const x = (clientX - left - width / 2) / (width / 2);
        const y = (clientY - top - height / 2) / (height / 2);

        // Limit range slightly if needed to prevent extreme shifts
        const limitedX = Math.max(-1, Math.min(1, x));
        const limitedY = Math.max(-1, Math.min(1, y));


        // Set CSS variables directly on the element
        // Use requestAnimationFrame for smoother updates (optional but good practice)
        requestAnimationFrame(() => {
           if (articleRef.current) { // Double check ref hasn't unmounted
             articleRef.current.style.setProperty('--x', limitedX);
             articleRef.current.style.setProperty('--y', limitedY);
           }
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      // Reset variables when component unmounts or effect re-runs
       if (articleRef.current) {
          articleRef.current.style.removeProperty('--x');
          articleRef.current.style.removeProperty('--y');
       }
    };
  }, []); // Empty dependency array means this effect runs only on mount and unmount

  return (
    <section className="hero-section">
      <article ref={articleRef}>
        <div className="assets">
          {/* --- CORRECTIONS START HERE --- */}
          <img
            src="https://img.freepik.com/free-photo/white-cloud-blue-sky-sea_74190-4488.jpg"
            // Add descriptive alt text for accessibility
            alt="Abstract vibrant sky over Osaka cityscape"
            // Prioritize loading this image as it's likely the main visual
            loading="eager"
            fetchpriority="high"
          />
          <h3>PurePixel</h3>
          <img
            src="https://img.freepik.com/premium-photo/illustration-person-taking-photo-tropical-forest_87009-14118.jpg?semt=ais_hybrid"
             // Add descriptive alt text
            alt="Illustration of a person taking photos in a lush tropical forest"
             // Defer loading this image until it's likely needed (if below the fold)
            loading="lazy"
          />
          {/* --- CORRECTIONS END HERE --- */}
        </div>

        {/* Blur layers */}
        <div className="blur">
          {/* Creating layers dynamically could be an option too */}
          {[1, 2, 3, 4, 5].map(index => (
             <div key={index} className="layer" style={{ '--index': index }}></div>
          ))}
        </div>

        {/* Content with SVG */}
        <div className="content">
          <p>
            {/* SVG attributes seem fine, ensure className doesn't conflict */}
            <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" /* Removed potentially conflicting w-6/h-6 class */ style={{ width: '48px', height: '0px', color: 'yellow' }}>
              <path d="M15.75 8.25a.75.75 0 0 1 .75.75c0 1.12-.492 2.126-1.27 2.812a.75.75 0 1 1-.992-1.124A2.243 2.243 0 0 0 15 9a.75.75 0 0 1 .75-.75Z" />
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM4.575 15.6a8.25 8.25 0 0 0 9.348 4.425 1.966 1.966 0 0 0-1.84-1.275.983.983 0 0 1-.97-.822l-.073-.437c-.094-.565.25-1.11.8-1.267l.99-.282c.427-.123.783-.418.982-.816l.036-.073a1.453 1.453 0 0 1 2.328-.377L16.5 15h.628a2.25 2.25 0 0 1 1.983 1.186 8.25 8.25 0 0 0-6.345-12.4c.044.262.18.503.389.676l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.575 15.6Z" clipRule="evenodd" />
            </svg>
          </p>
        </div>
      </article>
    </section>
  );
}

// Keep the React.memo wrapper for performance
export default React.memo(HeroSection);