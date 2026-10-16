
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <a href="#home" className="logo">
            ✦ AI CINEMA UNIVERSE
          </a>

          <p>Discover worlds beyond imagination.</p>

          <span className="footer-tagline">
            Where imagination becomes cinema.
          </span>
        </div>

        <div className="footer-links">
          <h3>Explore</h3>
          <a href="#home">Home</a>
          <a href="#my-list">My List</a>
          <a href="#platforms">AI Platforms</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} AI Cinema Universe.
          All rights reserved.
        </p>

        <span>Made for cinema lovers ✦</span>
      </div>
    </footer>
  );
};

export default Footer;
