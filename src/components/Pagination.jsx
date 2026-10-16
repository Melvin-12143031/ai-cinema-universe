
const Pagination = ({
    currentPage,
    hasNextPage,
    hasPreviousPage,
    onNext,
    onPrevious,
    loading,
}) => {
    return (
        <nav className="pagination" aria-label="Film catalog pages">
            <button
                type="button"
                onClick={onPrevious}
                disabled={!hasPreviousPage || loading}
            >
                Previous
            </button>

            <span>Page {currentPage}</span>

            <button
                type="button"
                onClick={onNext}
                disabled={!hasNextPage || loading}
            >
                Next
            </button>
        </nav>
    )
}

export default Pagination
