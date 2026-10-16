
const MovieTags = ({ tags = [] }) => {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="movie-details-tags">
      {tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  );
};

export default MovieTags;