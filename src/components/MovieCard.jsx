
import { useState, useRef } from 'react'

import FeaturedBadge from './FeaturedBadge'

const MovieCard = ({
  movie,
  onOpenDetails,
  onPlayMovie,
  onToggleMyList,
  isInMyList,
}) => {
  const [imageState, setImageState] = useState({
    poster: movie.poster,
    loaded: false,
    error: false,
    triedFallback: false,
  })

  const imageRef = useRef(null)

  // Ignore image state belonging to a previous poster.
  const currentImageState =
    imageState.poster === movie.poster
      ? imageState
      : {
          poster: movie.poster,
          loaded: false,
          error: false,
          triedFallback: false,
        }

  const updateImageState = (updates) => {
    setImageState((previous) => ({
      ...(
        previous.poster === movie.poster
          ? previous
          : {
              poster: movie.poster,
              loaded: false,
              error: false,
              triedFallback: false,
            }
      ),
      ...updates,
    }))
  }

  const handleImageLoad = (event) => {
    const img = event.currentTarget

    if (img.naturalWidth <= 120 && img.naturalHeight <= 90) {
      updateImageState({
        loaded: false,
        error: true,
      })
      return
    }

    updateImageState({
      loaded: true,
      error: false,
    })
  }

  const handleImageError = (event) => {
    const img = event.currentTarget

    if (
      img.src.includes('maxresdefault.jpg') &&
      !currentImageState.triedFallback
    ) {
      updateImageState({
        triedFallback: true,
        loaded: false,
        error: false,
      })

      img.src = img.src.replace(
        'maxresdefault.jpg',
        'hqdefault.jpg'
      )

      return
    }

    updateImageState({
      loaded: false,
      error: true,
    })
  }

  return (
    <article className="movie-card">
      <div className="movie-poster">
        {movie.featured && (
          <FeaturedBadge className="featured-badge">
            FEATURED
          </FeaturedBadge>
        )}

        {movie.poster && !currentImageState.error ? (
          <>
            {!currentImageState.loaded && (
              <div
                className="poster-loading"
                aria-label="Loading poster"
              />
            )}

            <img
              key={movie.poster}
              ref={imageRef}
              src={movie.poster}
              alt={`${movie.title} poster`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              className={
                currentImageState.loaded
                  ? 'poster-image loaded'
                  : 'poster-image'
              }
            />
          </>
        ) : (
          <div className="poster-placeholder">
            <span>✦</span>
            <p>Poster coming soon</p>
          </div>
        )}

        <button
          type="button"
          className="play-overlay"
          onClick={() => onPlayMovie(movie)}
          aria-label={`Play ${movie.title}`}
        >
          <span aria-hidden="true">▶</span>
        </button>
      </div>

      <div className="movie-info">
        <h3>{movie.title}</h3>

        <p>{movie.year || 'Year unknown'}</p>

        {movie.runtime && <p>{movie.runtime} min</p>}

        <div className="movie-card-tags">
          {(movie.tags?.length
            ? movie.tags
            : [movie.type || 'AI Film']
          ).map((tag) => (
            <span key={tag} className="movie-type">
              {tag}
            </span>
          ))}
        </div>

        {movie.durationType && (
          <span className="movie-duration-type">
            {movie.durationType}
          </span>
        )}

        <button
          type="button"
          className="movie-details-btn"
          onClick={() => onOpenDetails(movie)}
        >
          View Details
        </button>

        <button
          type="button"
          className={`my-list-btn ${
            isInMyList ? 'remove-from-list-btn' : ''
          }`}
          onClick={() => onToggleMyList(movie)}
          aria-pressed={isInMyList}
        >
          <span aria-hidden="true">
            {isInMyList ? 'x' : '+'}
          </span>
          {isInMyList ? 'Remove' : 'Add to My List'}
        </button>
      </div>
    </article>
  )
}

export default MovieCard
