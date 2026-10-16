
import { useEffect, useRef, useState } from "react"

import MovieMetadata from "./MovieMetadata"
import MovieTags from "./MovieTags"
import MovieSourceLinks from "./MovieSourceLinks"
import FeaturedBadge from "./FeaturedBadge"

const MovieDetails = ({ movie, onClose, onPlayMovie }) => {
    const [posterErrorState, setPosterErrorState] = useState({
        poster: movie?.poster,
        error: false,
    })

    const closeButtonRef = useRef(null)

    const posterError =
        posterErrorState.poster === movie?.poster &&
        posterErrorState.error

    const handlePosterError = () => {
        setPosterErrorState({
            poster: movie?.poster,
            error: true,
        })
    }


    useEffect(() => {
        if (!movie) return

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose()
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [movie, onClose])

    useEffect(() => {
        if (!movie) return

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.overflow = previousOverflow
        }
    }, [movie])

    if (!movie) {
        return null
    }

    return (
        <div className="movie-details-backdrop" onClick={onClose}>
            <article
                className="movie-details"
                role="dialog"
                aria-modal="true"
                aria-labelledby="movie-details-title"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    ref={closeButtonRef}
                    type="button"
                    className="movie-details-close"
                    onClick={onClose}
                    aria-label="Close film details"
                >
                    &times;
                </button>

                <div className="movie-details-layout">
                    <div className="movie-details-poster">
                        {movie.poster && !posterError ? (
                            <img
                                src={movie.poster}
                                alt={`${movie.title} poster`}
                                onError={handlePosterError}
                            />
                        ) : (
                            <div className="poster-placeholder">
                                <span>✦</span>
                                <p>Poster coming soon</p>
                            </div>
                        )}
                    </div>

                    <div className="movie-details-content">
                        <div className="movie-details-labels">
                            <p className="eyebrow">
                                {movie.durationType || "AI Film"}
                            </p>

                            {movie.featured && <FeaturedBadge />}
                        </div>

                        <h2 id="movie-details-title">{movie.title}</h2>

                        <MovieMetadata movie={movie} />

                        {movie.description && (
                            <p className="movie-details-description">
                                {movie.description}
                            </p>
                        )}

                        <MovieTags tags={movie.tags} />

                        <div className="movie-details-platform">
                            <span>Available on</span>
                            <strong>{movie.platform}</strong>
                        </div>

                        <div className="movie-details-actions">
                            {movie.videoId ? (
                                <button
                                    type="button"
                                    className="button button-primary"
                                    onClick={() => onPlayMovie(movie)}
                                >
                                    ▶ Watch film
                                </button>
                            ) : (
                                <div className="movie-source-status">
                                    <span
                                        className="source-status-dot"
                                        aria-hidden="true"
                                    />

                                    <div>
                                        <strong>Watch link coming soon</strong>
                                        <p>
                                            We haven't verified an official viewing source for this film yet.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <MovieSourceLinks
                            trailerUrl={movie.trailerUrl}
                            officialWebsite={movie.officialWebsite}
                        />
                    </div>
                </div>
            </article>
        </div>
    )
}

export default MovieDetails
