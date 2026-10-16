import { useState } from 'react'
import platforms from '../data/platforms.json'

const PlatformsSection = () => {

    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')


    const filteredPlatforms = platforms.filter((platform) => {
        const matchesSearch =
            platform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            platform.description.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesCategory =
            selectedCategory === 'All' ||
            platform.category === selectedCategory

        return matchesSearch && matchesCategory
    })

    const featuredPlatforms = platforms.filter(
        (platform) => platform.featured
    )

    const regularPlatforms = filteredPlatforms.filter(
        (platform) => !platform.featured
    )

    return (
        <section className="platforms-section" id="platforms">
            <div className="platforms-container">

                <div className="platforms-header">

                    <p className="section-eyebrow">
                        DISCOVER • CREATE • EXPLORE
                    </p>

                    <h1>Explore the AI Film Universe</h1>

                    <p>
                        Discover platforms where AI-powered stories come to life,
                        from watching experimental films to creating your own.
                    </p>

                </div>
                {featuredPlatforms
                    .filter((platform) => platform.featured)
                    .map((platform) => (
                        <article className="featured-platform" key={platform.id}>
                            <div className="featured-platform-content">
                                <span className="featured-platform-label">
                                    FEATURED PLATFORM
                                </span>



                                <div className="platform-title">
                                    <img
                                        src={platform.logo}
                                        alt=""
                                        className="platform-logo"
                                        loading="lazy"
                                    />
                                    <h2>{platform.name}</h2>
                                </div>
                                <span className="platform-category">
                                    {platform.category}
                                </span>
                                <p>{platform.description}</p>

                                <a
                                    href={platform.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="platform-visit-link"
                                >
                                    Explore Platform <span aria-hidden="true">↗</span>
                                </a>
                            </div>



                        </article>

                    ))}

                <div className="platforms-controls">
                    <div className="platforms-search">
                        <input
                            type="search"
                            placeholder="Search AI platforms..."
                            aria-label="Search AI platforms"
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                        />
                    </div>

                    <div className="platforms-filter">
                        <label htmlFor="platform-category-filter">
                            Category
                        </label>

                        <select
                            id="platform-category-filter"
                            value={selectedCategory}
                            onChange={(event) => setSelectedCategory(event.target.value)}
                        >
                            <option value="All">All Platforms</option>
                            <option value="Watch AI Films">Watch AI Films</option>
                            <option value="Create AI Films">Create AI Films</option>
                            <option value="Studios & Communities">
                                Studios &amp; Communities
                            </option>
                        </select>
                    </div>
                </div>


                {regularPlatforms.length > 0 ? (
                    <div className="platforms-grid">
                        {regularPlatforms.map((platform) => (
                            <article className="platform-card" key={platform.id}>

                                <div className="platform-card-content">
                                    <div className="platform-title">
                                        <img
                                            src={platform.logo}
                                            alt=""
                                            className="platform-logo"
                                            loading="lazy"
                                        />
                                        <h2>{platform.name}</h2>
                                    </div>

                                    <span className="platform-category">
                                        {platform.category}
                                    </span>

                                    <p>{platform.description}</p>

                                    <a
                                        href={platform.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="platform-visit-link"
                                    >
                                        Visit Website <span aria-hidden="true">↗</span>
                                    </a>
                                </div>

                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="platforms-empty-state">
                        <h2>No platforms found</h2>
                        <p>
                            Try another search term or choose a different category.
                        </p>
                        <button
                            type="button"
                            onClick={() => {
                                setSearchQuery('')
                                setSelectedCategory('All')
                            }}
                        >
                            Clear Filters
                        </button>
                    </div>
                )}

            </div>
        </section>
    )
}

export default PlatformsSection
