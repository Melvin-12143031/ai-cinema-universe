
import { useRef, useState } from 'react'

import './App.css'

// Components
import ClearMyListDialog from './components/ClearMyListDialog'
import FilmsSection from './components/FilmsSection'
import Footer from './components/Footer'
import Hero from './components/Hero'
import MovieDetails from './components/MovieDetails'
import MoviePlayer from './components/MoviePlayer'
import NavBar from './components/NavBar'
import PlatformsSection from './components/PlatformsSection'

// Data
import movieTypes from './data/movieTypes'

// Handlers
import {
  cancelClearMyList,
  confirmClearMyList,
  handleClearMyList,
  handleNextPage,
  handlePreviousPage,
  handleToggleMyList,
  isMovieInMyList,
} from './handlers/movieHandlers'

// Hooks
import useMovies from './hooks/useMovies'
import useMyList from './hooks/useMyList'

// Pages
import MyListPage from './pages/MyListPage'

const App = () => {
  // Filter and selection state
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('All')
  const [selectedFormat, setSelectedFormat] = useState('All')
  const [featuredOnly, setFeaturedOnly] = useState(false)
  const [sortBy, setSortBy] = useState('default')
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [playingMovie, setPlayingMovie] = useState(null)

  // My List state
  const { myList, setMyList } = useMyList()
  const [showClearMyListDialog, setShowClearMyListDialog] =
    useState(false)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [currentCursor, setCurrentCursor] = useState('')
  const [cursorHistory, setCursorHistory] = useState([])

  // DOM references
  const movieGridRef = useRef(null)

  // Fetch movies
  const { movies, loading, error, nextCursor } = useMovies({
    currentCursor,
    selectedType,
    selectedFormat,
    search,
  })


  // Filter movies
  const filteredMovies = movies.filter((movie) => {
    const matchesType =
      selectedType === 'All' ||
      (movie.tags ?? []).some(
        (tag) =>
          tag.toLowerCase() === selectedType.toLowerCase()
      )

    const matchesFeatured = !featuredOnly || movie.featured

    return matchesType && matchesFeatured
  })

  // Sort movies
  const sortedMovies = [...filteredMovies].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title)
    }

    if (sortBy === 'year') {
      return (b.year || 0) - (a.year || 0)
    }

    return 0
  })


  // Filter actions
  const resetPagination = () => {
    setCurrentPage(1)
    setCurrentCursor('')
    setCursorHistory([])
  }

  const handleSearchChange = (value) => {
    setSearch(value)
    resetPagination()
  }

  const handleTypeChange = (value) => {
    setSelectedType(value)
    resetPagination()
  }

  const handleFormatChange = (value) => {
    setSelectedFormat(value)
    resetPagination()
  }

  const handleFeaturedChange = (value) => {
    setFeaturedOnly(value)
    resetPagination()
  }

  const clearFilters = () => {
    setSearch('')
    setSelectedType('All')
    setFeaturedOnly(false)
    setSelectedFormat('All')
    setSortBy('default')
    resetPagination()
  }


  // Scroll to the movie grid
  const scrollToMovieGrid = () => {
    if (!movieGridRef.current) return

    const gridPosition =
      movieGridRef.current.getBoundingClientRect().top +
      window.scrollY

    window.scrollTo({
      top: gridPosition - 20,
      behavior: 'smooth',
    })
  }

  // Pagination actions
  const onNextPage = () => {
    handleNextPage({
      nextCursor,
      loading,
      currentCursor,
      setCursorHistory,
      setCurrentCursor,
      setCurrentPage,
      scrollToMovieGrid,
    })
  }

  const onPreviousPage = () => {
    handlePreviousPage({
      cursorHistory,
      loading,
      setCursorHistory,
      setCurrentCursor,
      setCurrentPage,
      scrollToMovieGrid,
    })
  }

  // My List actions
  const onToggleMyList = (movie) => {
    handleToggleMyList(movie, setMyList)
  }

  const onClearMyList = () => {
    handleClearMyList(setShowClearMyListDialog)
  }

  const onConfirmClearMyList = () => {
    confirmClearMyList(setMyList, setShowClearMyListDialog)
  }

  const onCancelClearMyList = () => {
    cancelClearMyList(setShowClearMyListDialog)
  }

  const checkIsMovieInMyList = (movieId) => {
    return isMovieInMyList(movieId, myList)
  }

  // Render app
  return (
    <main className="app">
      <NavBar ListCount={myList.length} />

      <Hero />

      <FilmsSection
        search={search}
        setSearch={handleSearchChange}
        selectedType={selectedType}
        setSelectedType={handleTypeChange}
        selectedFormat={selectedFormat}
        setSelectedFormat={handleFormatChange}
        featuredOnly={featuredOnly}
        setFeaturedOnly={handleFeaturedChange}
        sortBy={sortBy}
        setSortBy={setSortBy}
        movieTypes={movieTypes}
        movies={movies}
        filteredMovies={filteredMovies}
        sortedMovies={sortedMovies}
        loading={loading}
        error={error}
        movieGridRef={movieGridRef}
        currentPage={currentPage}
        cursorHistory={cursorHistory}
        nextCursor={nextCursor}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
        onClearFilters={clearFilters}
        onOpenDetails={setSelectedMovie}
        onPlayMovie={setPlayingMovie}
        onToggleMyList={onToggleMyList}
        isMovieInMyList={checkIsMovieInMyList}
      />

      <MyListPage
        myList={myList}
        onOpenDetails={setSelectedMovie}
        onPlayMovie={setPlayingMovie}
        onToggleMyList={onToggleMyList}
        onClearMyList={onClearMyList}
      />

      <PlatformsSection />

      <Footer />

      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onPlayMovie={(movie) => {
            setSelectedMovie(null)
            setPlayingMovie(movie)
          }}
        />
      )}

      <MoviePlayer
        movie={playingMovie}
        onClose={() => setPlayingMovie(null)}
      />

      {showClearMyListDialog && (
        <ClearMyListDialog
          onConfirm={onConfirmClearMyList}
          onCancel={onCancelClearMyList}
        />
      )}
    </main>
  )
}

export default App
