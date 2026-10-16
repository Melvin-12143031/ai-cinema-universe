export const handleToggleMyList = (movie, setMyList) => {
  setMyList((previousList) => {
    const alreadySaved = previousList.some(
      (savedMovie) => savedMovie.id === movie.id
    )

    if (alreadySaved) {
      return previousList.filter(
        (savedMovie) => savedMovie.id !== movie.id
      )
    }

    return [...previousList, movie]
  })
}

export const isMovieInMyList = (movieId, myList) => {
  return myList.some(
    (movie) => movie.id === movieId
  )
}

export const handleClearMyList = (
  setShowClearMyListDialog
) => {
  setShowClearMyListDialog(true)
}

export const confirmClearMyList = (
  setMyList,
  setShowClearMyListDialog
) => {
  setMyList([])
  setShowClearMyListDialog(false)
}

export const cancelClearMyList = (
  setShowClearMyListDialog
) => {
  setShowClearMyListDialog(false)
}

export const handleNextPage = ({
  nextCursor,
  loading,
  currentCursor,
  setCursorHistory,
  setCurrentCursor,
  setCurrentPage,
  scrollToMovieGrid,
}) => {
  if (!nextCursor || loading) return

  setCursorHistory((previous) => [
    ...previous,
    currentCursor,
  ])

  setCurrentCursor(nextCursor)
  setCurrentPage((previous) => previous + 1)
  scrollToMovieGrid()
}

export const handlePreviousPage = ({
  cursorHistory,
  loading,
  setCursorHistory,
  setCurrentCursor,
  setCurrentPage,
  scrollToMovieGrid,
}) => {
  if (cursorHistory.length === 0 || loading) return

  const previousCursor =
    cursorHistory[cursorHistory.length - 1]

  setCursorHistory((previous) => previous.slice(0, -1))
  setCurrentCursor(previousCursor)
  setCurrentPage((previous) => previous - 1)
  scrollToMovieGrid()
}