

const NavBar = ({ListCount}) => {
    return (
        <header className="navbar">
            <a href="#home" className="logo">
                <span className="logo-icon">✦</span>
                AI CINEMA <span>UNIVERSE</span>
            </a>

            <nav className="nav-links">
                <a href="#home">Discover</a>
                <a href="#films">Films</a>
                <a href="#my-list">My List ({ListCount})</a>
                <a href="#platforms">Platforms</a>
            </nav>

        </header>
    )
}

export default NavBar
