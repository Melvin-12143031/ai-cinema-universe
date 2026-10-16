
import MovieCard from './MovieCard';
import Pagination from './Pagination';

const FilmsSection = ({
    search,
    setSearch,
    selectedType,
    setSelectedType,
    selectedFormat,
    setSelectedFormat,
    featuredOnly,
    setFeaturedOnly,
    sortBy,
    setSortBy,
    movieTypes,
    sortedMovies,
    loading,
    error,
    movieGridRef,
    currentPage,
    cursorHistory,
    nextCursor,
    onNextPage,
    onPreviousPage,
    onClearFilters,
    onOpenDetails,
    onPlayMovie,
    onToggleMyList,
    isMovieInMyList,
    movies,
    filteredMovies,
}) => {
    return (
        <section className="films-section" id="films">

            <div className="section-heading">
                <div>
                    <p className="eyebrow">YOUR NEXT OBSESSION</p>
                    <h2>Enter the universe.</h2>
                </div>

                <p className="section-description">
                    AI-generated stories worth discovering.
                </p>
            </div>

            <div className="catalog-content">
                <div className="category-filters" aria-label="Filter films by category">
                    <div className="format-filters" aria-label="Filter films by format">
                        {['All', 'Short Film', 'Feature Film'].map((format) => (
                            <button
                                key={format}
                                type="button"
                                className={`format-button ${selectedFormat === format ? 'active' : ''
                                    }`}
                                onClick={() => setSelectedFormat(format)}
                                aria-pressed={selectedFormat === format}
                            >
                                {format === 'All' ? 'All formats' : format}
                            </button>
                        ))}
                    </div>

                    {movieTypes.map((type) => (
                        <button
                            key={type}
                            type="button"
                            className={`category-button ${selectedType === type ? 'active' : ''
                                }`}
                            onClick={() => setSelectedType(type)}
                            aria-pressed={selectedType === type}
                        >
                            {type}
                        </button>
                    ))}

                    <button
                        type="button"
                        className={`featured-filter ${featuredOnly ? 'active' : ''}`}
                        onClick={() => setFeaturedOnly((current) => !current)}
                        aria-pressed={featuredOnly}
                    >
                        ✦ Featured only
                    </button>
                </div>

                <div className="catalog-search">
                    <span aria-hidden="true">⌕</span>

                    <input
                        type="search"
                        placeholder="Search films..."
                        aria-label="Search films"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />

                    {(search || selectedType !== 'All' || featuredOnly) && (
                        <button
                            type="button"
                            className="clear-search"
                            onClick={() => setSearch('')}
                            aria-label="Clear search"
                        >
                            &times;
                        </button>
                    )}
                </div>

                <div className="catalog-toolbar">
                    <p className="catalog-label">CURATED COLLECTION</p>

                    <div className="catalog-toolbar-actions">
                        <p className="catalog-count">
                            <label className="sort-control">
                                <span>Sort by</span>

                                <select
                                    value={sortBy}
                                    onChange={(event) => setSortBy(event.target.value)}
                                    aria-label="Sort films"
                                >
                                    <option value="default">Default</option>
                                    <option value="title">Title (A–Z)</option>
                                    <option value="year">Newest first</option>
                                </select>
                            </label>

                            {filteredMovies.length}{' '}
                            {filteredMovies.length === 1 ? 'film' : 'films'}
                        </p>

                        {(search || selectedType !== 'All') && (
                            <button
                                type="button"
                                className="clear-filters"
                                onClick={onClearFilters}
                            >
                                Clear filters
                            </button>
                        )}

                        {(search || selectedType !== 'All' || featuredOnly) && (
                            <p className="active-filter-message">
                                Showing filtered results
                                {selectedType !== 'All' && ` · ${selectedType}`}
                                {featuredOnly && ' · Featured'}
                                {search.trim() && ` · Search: "${search.trim()}"`}
                            </p>
                        )}
                    </div>
                </div>

                {loading ? (
                    <div className="catalog-message" role="status">
                        <p>Discovering films across the universe...</p>
                    </div>
                ) : error ? (
                    <div className="catalog-message" role="alert">
                        <h3>Something went wrong</h3>
                        <p>{error}</p>
                        <button
                            type="button"
                            className="clear-filters-btn"
                            onClick={() => window.location.reload()}
                        >
                            Try again
                        </button>
                    </div>
                ) : filteredMovies.length > 0 ? (
                    <>
                        
                        <div className="movie-grid" ref={movieGridRef}>
                            {sortedMovies.map((movie) => (

                                <MovieCard
                                    key={movie.id}
                                    movie={movie}
                                    onOpenDetails={onOpenDetails}
                                    onPlayMovie={onPlayMovie}
                                    onToggleMyList={onToggleMyList}
                                    isInMyList={isMovieInMyList(movie.id)}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="no-results">
                        <span aria-hidden="true">⌕</span>
                        <h3>No films found</h3>
                        <p>
                            We couldn't find any films matching your current
                            search or filters. Try adjusting your selection.
                        </p>
                        <button
                            type="button"
                            className="clear-filters-btn"
                            onClick={onClearFilters}
                        >
                            Clear filters
                        </button>
                    </div>
                )}

                {!loading && !error && movies.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        hasNextPage={Boolean(nextCursor)}
                        hasPreviousPage={cursorHistory.length > 0}
                        onNext={onNextPage}
                        onPrevious={onPreviousPage}
                        loading={loading}
                    />
                )}
            </div>

        </section>
    );
};

export default FilmsSection;
