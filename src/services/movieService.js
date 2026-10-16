
const API_URL = 'https://hollywood.ai/api/agent/search';

export const getMovies = async ({
  query = '',
  genre = '',
  format = 'film',
  limit = 20,
  cursor = '',
  sort = 'popular',
  minMinutes,
  maxMinutes,
} = {}) => {
  const params = new URLSearchParams({
    format,
    limit: String(limit),
    sort,
  });

  if (query.trim()) {
    params.set('q', query.trim());
  }

  if (genre) {
    params.set('genre', genre);
  }

  if (cursor) {
    params.set('cursor', cursor);
  }

if (minMinutes !== undefined) {
  params.set('minMinutes', String(minMinutes));
}

if (maxMinutes !== undefined) {
  params.set('maxMinutes', String(maxMinutes));
}

  const response = await fetch(
    `${API_URL}?${params.toString()}`
  );



  if (!response.ok) {
    throw new Error('Unable to load AI films. Please try again.');
  }

  
const data = await response.json();


const movies = (data.results ?? []).map((movie) => ({
  id: movie.id,
  title: movie.title,
  year: movie.addedAt
    ? new Date(movie.addedAt).getFullYear()
    : null,
  releaseDate: null,
  runtime: movie.runtimeMinutes ?? null,
  type: movie.genres?.[0] ?? 'AI Film',
  
durationType:
  movie.format === 'vertical' || movie.format === 'short'
    ? 'Short Film'
    : movie.format === 'series'
      ? 'Series'
      : movie.format === 'film'
        ? (movie.runtimeMinutes <= 15
            ? 'Short Film'
            : 'Feature Film')
        : 'Other',

  language: movie.language ?? null,
  contentRating: null,
  director: null,
  creator: movie.creator ?? null,
  country: null,
  tags: movie.genres ?? [],
  poster: movie.thumbnail ?? '',
  videoId: movie.thumbnail?.match(
  /\/vi\/([^/]+)\//
)?.[1] ?? null,
  featured: false,
  description: movie.synopsis ?? '',
  platform: 'Hollywood.AI',
platformUrl: movie.url ?? '',
playable: Boolean(movie.url),
trailerUrl: '',
officialWebsite: movie.url ?? '',
}));


return {
  movies,
  total: data.total ?? movies.length,
  nextCursor: data.next ?? null,
};

};

export default getMovies;