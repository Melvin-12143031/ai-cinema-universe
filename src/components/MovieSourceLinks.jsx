
const MovieSourceLinks = ({ trailerUrl, officialWebsite }) => {
  if (!trailerUrl && !officialWebsite) {
    return null;
  }

  return (
    <div className="movie-source-links">
      {trailerUrl && (
        <a
          href={trailerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="movie-external-link"
        >
          Watch Trailer ↗
        </a>
      )}

      {officialWebsite && (
        <a
          href={officialWebsite}
          target="_blank"
          rel="noopener noreferrer"
          className="movie-external-link"
        >
          Official Website ↗
        </a>
      )}
    </div>
  );
};

export default MovieSourceLinks;