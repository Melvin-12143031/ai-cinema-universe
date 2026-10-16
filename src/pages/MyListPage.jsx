
import MovieCard from '../components/MovieCard'

const MyListPage = ({
    myList,
    onOpenDetails,
    onPlayMovie,
    onToggleMyList,
    onClearMyList,
}) => {
    return (
        <section className="films-section my-list-section" id="my-list">

            <div className="section-heading my-list-heading">
                <div>
                    <p className="eyebrow">YOUR PERSONAL COLLECTION</p>
                    <h2>My List.</h2>
                </div>

                <div className="my-list-heading-actions">

                    <p className="section-description">
                        Your saved AI-generated films, all in one place.
                    </p>

                    {myList.length > 0 && (
                        <button
                            type="button"
                            className="clear-my-list-btn"
                            onClick={onClearMyList}
                        >
                            <span aria-hidden="true">x </span>
                            Clear My List
                        </button>
                    )}
                </div>
            </div>


            {myList.length > 0 ? (
                <div className="movie-grid">
                    {myList.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            onOpenDetails={onOpenDetails}
                            onPlayMovie={onPlayMovie}
                            onToggleMyList={onToggleMyList}
                            isInMyList={true}
                        />
                    ))}
                </div>
            ) : (
                <div className="no-results">
                    <span aria-hidden="true">♡</span>
                    <h3>Your list is empty</h3>
                    <p>
                        Save films that catch your eye, and they'll appear here.
                    </p>
                    <a href="#films" className="button button-primary">
                        Explore Films ↗
                    </a>
                </div>
            )}
        </section>
    )
}

export default MyListPage
