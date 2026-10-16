
const MovieMetadata = ({ movie }) => {
  const metadata = [
    movie.year,
    movie.runtime ? `${movie.runtime} min` : null,
    movie.releaseDate
      ? `Released: ${movie.releaseDate}`
      : null,
    movie.language
      ? `Language: ${movie.language}`
      : null,
    movie.contentRating
      ? `Rated: ${movie.contentRating}`
      : null,
    movie.platform,
    movie.director
      ? `Director: ${movie.director}`
      : null,
    movie.creator
      ? `Creator: ${movie.creator}`
      : null,
    movie.country
      ? `Country: ${movie.country}`
      : null,
  ].filter(Boolean);

  if (metadata.length === 0) {
    return null;
  }

  return (
    <div className="movie-details-meta">
      {metadata.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
};

export default MovieMetadata;