const Hero = () => {
  return (
<section className="hero" id="home">
        <div className="hero-content">
          <p className="eyebrow">THE FUTURE OF FILM IS HERE</p>

          <h1>
            Discover worlds
            <br />
            beyond <span>imagination.</span>
          </h1>

          <p className="hero-description">
            Explore extraordinary stories brought to life through
            artificial intelligence. One universe, endless possibilities.
          </p>

          <div className="hero-actions">
            <a href="#films" className="button button-primary">
              Explore Films <span>↗</span>
            </a>

            <a href="#platforms" className="button button-secondary">
              Discover Platforms
            </a>
          </div>
        </div>
      </section>
  )
}

export default Hero
