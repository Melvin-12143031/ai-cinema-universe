
import { useState } from 'react'

const MoviePlayer = ({ movie, onClose }) => {
    const [embedError, setEmbedError] = useState(false)

    if (!movie) return null

    const videoUrl = movie.videoId
    ? `https://www.youtube.com/embed/${movie.videoId}?autoplay=1&rel=0&playsinline=1&iv_load_policy=3`
    : null

    console.log('Playing movie:', movie.title)
    console.log('Video ID:', movie.videoId)
    console.log('Embed URL:', videoUrl)

    return (
        <div
            className="movie-player-backdrop"
            onClick={onClose}
        >
            <section
                className="movie-player"
                role="dialog"
                aria-modal="true"
                aria-label={`Watch ${movie.title}`}
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    className="movie-player-close"
                    onClick={onClose}
                    aria-label="Close movie player"
                >
                    &times;
                </button>

                <h2>{movie.title}</h2>

                {videoUrl && !embedError ? (
                    <iframe
                        src={videoUrl}
                        title={`Watch ${movie.title}`}
                        referrerPolicy="strict-origin-when-cross-origin"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        onError={() => setEmbedError(true)}
                    />
                ) : (
                    <div className="movie-player-fallback">
                        <p>
                            Embedded playback isn't available for this film.
                        </p>

                        {movie.platformUrl && (
                            <p>
                                Video ID: {movie.videoId || 'Not available'}
                            </p>
                        )}
                    </div>
                )}
            </section>
        </div>
    )
}

export default MoviePlayer
