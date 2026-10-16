
import { useEffect, useState } from 'react'
import { getMovies } from '../services/movieService'

const useMovies = ({
  currentCursor,
  selectedType,
  selectedFormat,
  search,
}) => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [nextCursor, setNextCursor] = useState(null)

  useEffect(() => {
    let isActive = true

    const loadMovies = async () => {
      try {
        setLoading(true)
        setError('')

        const data = await getMovies({
          limit: 20,
          cursor: currentCursor,
          genre: selectedType === 'All' ? '' : selectedType,
          format: 'film',
          query: search,
          maxMinutes:
            selectedFormat === 'Short Film' ? 15 : undefined,
          minMinutes:
            selectedFormat === 'Feature Film' ? 16 : undefined,
        })

        if (!isActive) return

        setMovies(data.movies)
        setNextCursor(data.nextCursor)
      } catch (error) {
        if (!isActive) return

        console.error('Failed to load AI films:', error)
        setError('Unable to load films. Please try again.')
      } finally {
        if (isActive) {
          setLoading(false)
        }
      }
    }

    loadMovies()

    return () => {
      isActive = false
    }
  }, [currentCursor, selectedType, selectedFormat, search])

  return {
    movies,
    loading,
    error,
    nextCursor,
  }
}

export default useMovies
