import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // State for desktop TOOLS dropdown visibility
  const [toolsDropdownVisible, setToolsDropdownVisible] = useState(false);
  // State for mobile TOOLS dropdown visibility
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);

  // Check if mobile on initial render and window resize
  useEffect(() => {
    const checkMobile = () => {
      const mobileCheck = window.innerWidth <= 768;
      if (mobileCheck !== isMobile) { // Only update state if it changes
          setIsMobile(mobileCheck);
          // Reset dropdown states if screen size changes mode
          if (!mobileCheck) { // Switched to Desktop
            setMobileToolsOpen(false);
            setIsOpen(false); // Close mobile menu too
          } else { // Switched to Mobile
            setToolsDropdownVisible(false);
          }
      }
    };

    // Check on mount
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]); // Add isMobile dependency to re-run if it changes externally

  // Nav items - matching your image
  const navItems = ['HOME', 'PEEL NOW', 'ABOUT', 'CONTACT', 'TOOLS'];

  // Function to handle navigation scroll
  const scrollToSection = (sectionId) => {
    // Close mobile menu if open
    setIsOpen(false);
    // Close mobile tools dropdown as well
    setMobileToolsOpen(false);

    // Get the section element
    const section = document.getElementById(sectionId);

    // If section exists, scroll to it
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      console.warn(`Section with ID "${sectionId}" not found.`);
    }
  };

  // --- STYLES --- (Mostly unchanged, minor adjustment to dropdown style)

  const containerStyle = {
    backgroundColor: '#000000',
    padding: '20px 0',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Keep relative for potential absolute children like mobile menu
  };

  const navContainerStyle = {
    display: 'flex',
    width: '90%',
    maxWidth: '1200px',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const logoStyle = {
    color: '#ffffff',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    marginRight: '20px',
  };

  const pillNavbarStyle = {
    backgroundColor: '#000000',
    borderRadius: '50px',
    padding: isMobile ? '10px 15px' : '10px 30px',
    display: 'flex', // Keep flex for mobile button alignment
    justifyContent: isMobile ? 'space-between' : 'center', // Center desktop items, space-between mobile
    alignItems: 'center',
    border: '2.5px solid yellow',
    position: 'relative', // Needed for absolute positioning of mobile menu button if moved inside
  };

  const desktopNavStyle = {
    display: isMobile ? 'none' : 'flex',
    justifyContent: 'space-between',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    alignItems: 'center',
    gap: '25px',
  };

  // Desktop nav item styles - Added position relative for dropdown context
  const desktopNavItemStyle = {
    padding: '5px 0',
    position: 'relative', // Needed for absolute positioning of dropdown
  };

  const desktopNavLinkStyle = {
    color: '#ffffff',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
    letterSpacing: '1px',
    padding: '5px 0', // Maintain padding for hover effect area
    position: 'relative', // For potential pseudo-elements like underline
    cursor: 'pointer',
    display: 'inline-block', // Ensure span behaves like a block for positioning
  };

  // Desktop dropdown container style
  const desktopDropdownStyle = {
    display: toolsDropdownVisible ? 'block' : 'none', // Control visibility
    position: 'absolute',
    top: '100%', // Position directly below the parent li/span
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#000000',
    border: '1px solid yellow',
    borderRadius: '4px',
    padding: '10px 0', // Padding inside the dropdown
    minWidth: '120px',
    zIndex: 10,
    marginTop: '0px', // *** REMOVED MARGIN TOP TO PREVENT GAP ***
    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
    textAlign: 'center', // Center dropdown text
  };

  // Desktop dropdown item style
  const desktopDropdownLinkStyle = {
    display: 'block',
    color: '#ffffff',
    padding: '8px 15px',
    textDecoration: 'none',
    fontSize: '0.85rem',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease', // Smooth hover effect
  };


  const mobileMenuButtonStyle = {
    display: isMobile ? 'block' : 'none',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '5px',
    zIndex: 1001, // Ensure button is clickable
  };

  const hamburgerLineStyle = {
    width: '25px',
    height: '3px',
    backgroundColor: '#ffffff',
    margin: '5px 0',
    transition: 'all 0.3s ease',
    display: 'block',
  };

  // Mobile menu container styles
  const mobileMenuStyle = {
    position: 'absolute',
    top: 'calc(100% + 10px)', // Position below the header bar with a small gap
    left: 0,
    width: '100%',
    backgroundColor: '#000000',
    maxHeight: isOpen ? '500px' : '0',
    overflow: 'hidden',
    transition: 'max-height 0.4s ease-in-out',
    zIndex: 999, // High z-index
    borderBottom: isOpen ? '1px solid yellow' : 'none', // Optional: add border when open
  };

  const mobileNavStyle = {
    listStyle: 'none',
    padding: '10px 0',
    margin: '0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const mobileNavItemStyle = {
    padding: '12px 0',
    width: '80%',
    textAlign: 'center',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  };

   // Special style for last mobile item to remove border
   const lastMobileNavItemStyle = {
     ...mobileNavItemStyle,
     borderBottom: 'none',
   }

  const mobileNavLinkStyle = {
    display: 'block',
    color: '#ffffff',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '0.9rem',
    letterSpacing: '1px',
    padding: '5px 0',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
  };

  // Mobile dropdown item style (indented)
  const mobileDropdownItemStyle = {
      padding: '10px 0 10px 30px', // Indent the sub-items
      width: '80%', // Match parent width
      margin: '0 auto', // Center the item block itself
      textAlign: 'left', // Align text left
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)', // Maintain separator
  };

   // Special style for last mobile dropdown item
   const lastMobileDropdownItemStyle = {
       ...mobileDropdownItemStyle,
       borderBottom: 'none',
   };

  // Mobile dropdown link style
  const mobileDropdownLinkStyle = {
      display: 'block',
      color: '#cccccc', // Slightly dimmer color
      textDecoration: 'none',
      fontSize: '0.85rem',
      cursor: 'pointer',
      transition: 'color 0.2s ease',
  };


  // Handle logo click to scroll to top
  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    // Close mobile menu if open
    setIsOpen(false);
    setMobileToolsOpen(false);
  };

  // --- RENDER LOGIC ---

  return (
    // Use position: sticky and top: 0 if you want the navbar to stick
    <div style={{ position: 'relative', zIndex: 1000 }}> {/* Increased z-index */}
      {/* Main Navbar Container */}
      <div style={containerStyle}>
        <div style={navContainerStyle}>
          {/* Logo */}
          <a
            href="#" // Use href="#" for semantics, click handled by JS
            onClick={handleLogoClick}
            style={{ ...logoStyle, display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          >
            <img
                src="/icon.ico"  // Make sure this path is correct relative to your public folder
                alt="Logo"
                style={{ height: '60px', width: 'auto' }} // Adjust size as needed
            />
          </a>

          {/* Pill-shaped Navbar */}
          <div style={pillNavbarStyle}>
             {/* Mobile Menu Button - Rendered within the pill on mobile */}
             {isMobile && (
               <button
                 style={mobileMenuButtonStyle}
                 onClick={() => {
                   setIsOpen(!isOpen);
                   if (isOpen) setMobileToolsOpen(false); // Close tools if closing main menu
                 }}
                 aria-label="Toggle menu"
                 aria-expanded={isOpen}
               >
                 <span style={{ ...hamburgerLineStyle, transform: isOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none' }}></span>
                 <span style={{ ...hamburgerLineStyle, opacity: isOpen ? 0 : 1 }}></span>
                 <span style={{ ...hamburgerLineStyle, transform: isOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none' }}></span>
               </button>
             )}

            {/* Desktop Navigation */}
            {!isMobile && (
                <ul style={desktopNavStyle}>
                {navItems.map((item) => {
                    const sectionId = item.toLowerCase().replace(' ', '-');
                    if (item === 'TOOLS') {
                    return (
                        <li
                        key={item}
                        style={desktopNavItemStyle}
                        // *** Handlers remain on the LI to keep dropdown open when hovering over it ***
                        onMouseEnter={() => setToolsDropdownVisible(true)}
                        onMouseLeave={() => setToolsDropdownVisible(false)}
                        >
                        <span // Use span for the text part
                            style={{
                                ...desktopNavLinkStyle,
                                borderBottom: toolsDropdownVisible ? '2px solid yellow' : 'none', // Keep underline while dropdown is open
                                color: toolsDropdownVisible ? 'yellow' : '#ffffff' // Keep yellow while dropdown is open
                            }}
                            // No hover effect needed here now, handled by li's state
                        >
                            {item}
                            <span style={{ marginLeft: '5px', fontSize: '0.7rem', display: 'inline-block', verticalAlign: 'middle' }}>▼</span>
                        </span>

                        {/* Desktop Dropdown Menu - positioned relative to the LI */}
                        <div style={desktopDropdownStyle}>
                            <a href="https://compress-quick.vercel.app/" /* Replace with actual path */
                            style={desktopDropdownLinkStyle}
                            onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 0, 0.2)'} // Slightly more visible hover
                            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                            // Add onClick if needed for SPA routing, e.g., onClick={() => navigate('/compress')}
                            >
                             CompressQuick
                            </a>
                            <a href="https://peek-text.vercel.app/" /* Replace with actual path */
                            style={desktopDropdownLinkStyle}
                            onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 0, 0.2)'}
                            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                            // Add onClick if needed
                            >
                             PeekText
                            </a>
                        </div>
                        </li>
                    );
                    } else {
                    // Regular navigation item
                    return (
                        <li key={item} style={desktopNavItemStyle}>
                        <span
                            onClick={() => scrollToSection(sectionId)}
                            style={desktopNavLinkStyle}
                            onMouseOver={(e) => {
                                e.target.style.color = 'yellow';
                                e.target.style.borderBottom = '2px solid yellow';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.color = '#ffffff';
                                e.target.style.borderBottom = 'none';
                            }}
                        >
                            {item}
                        </span>
                        </li>
                    );
                    }
                })}
                </ul>
            )}

          </div>
        </div>
      </div>

      {/* Mobile Menu - Rendered outside the flow but positioned absolutely */}
      {isMobile && (
          <div style={mobileMenuStyle}>
            <ul style={mobileNavStyle}>
            {navItems.map((item, index) => {
                const sectionId = item.toLowerCase().replace(' ', '-');
                const isLastItem = index === navItems.length - 1;

                if (item === 'TOOLS') {
                return (
                    <React.Fragment key={item}>
                    {/* Tools Item - Toggles Submenu */}
                    <li style={mobileNavItemStyle}> {/* Use regular style here */}
                        <span
                        onClick={() => setMobileToolsOpen(!mobileToolsOpen)} // Toggle submenu
                        style={mobileNavLinkStyle}
                        onMouseOver={(e) => { e.target.style.color = 'yellow'; }} // Change hover color to yellow
                        onMouseOut={(e) => { e.target.style.color = '#ffffff'; }}
                        >
                        {item}
                        <span style={{ marginLeft: '10px', display: 'inline-block', transform: mobileToolsOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▼</span>
                        </span>
                    </li>
                    {/* Mobile Tools Submenu Items - Conditionally Rendered */}
                    {mobileToolsOpen && (
                        <>
                        <li style={mobileDropdownItemStyle}> {/* Use specific dropdown item style */}
                            <a href="https://compress-quick.vercel.app/" /* Replace with actual path */
                                style={mobileDropdownLinkStyle}
                                onClick={() => setIsOpen(false)} // Close menu on click
                                onMouseOver={(e) => { e.target.style.color = 'yellow'; }}
                                onMouseOut={(e) => { e.target.style.color = '#cccccc'; }}
                            >
                                CompressQuick
                            </a>
                        </li>
                        <li style={isLastItem ? lastMobileDropdownItemStyle : mobileDropdownItemStyle}> {/* Use specific style, check if last */}
                            <a href="https://peek-text.vercel.app/" /* Replace with actual path */
                                style={mobileDropdownLinkStyle}
                                onClick={() => setIsOpen(false)} // Close menu on click
                                onMouseOver={(e) => { e.target.style.color = 'yellow'; }}
                                onMouseOut={(e) => { e.target.style.color = '#cccccc'; }}
                            >
                             PeekText
                            </a>
                        </li>
                        </>
                    )}
                    </React.Fragment>
                );
                } else {
                // Regular Mobile Navigation Item
                return (
                    <li key={item} style={isLastItem && !mobileToolsOpen ? lastMobileNavItemStyle : mobileNavItemStyle}> {/* Remove border if last and tools closed */}
                    <span
                        onClick={() => scrollToSection(sectionId)}
                        style={mobileNavLinkStyle}
                        onMouseOver={(e) => { e.target.style.color = 'yellow'; }} // Change hover to yellow
                        onMouseOut={(e) => { e.target.style.color = '#ffffff'; }}
                    >
                        {item}
                    </span>
                    </li>
                );
                }
            })}
            </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;