
const ClearMyListDialog = ({ onConfirm, onCancel }) => {
    return (
        <div
            className="confirm-dialog-backdrop"
            onClick={onCancel}
        >
            <section
                className="confirm-dialog"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="clear-list-title"
                aria-describedby="clear-list-description"
                onClick={(event) => event.stopPropagation()}
            >
                <h2 id="clear-list-title">Clear My List?</h2>

                <p id="clear-list-description">
                    Are you sure you want to remove all saved films
                    from your list? This action cannot be undone.
                </p>

                <div className="confirm-dialog-actions">
                    <button
                        type="button"
                        className="confirm-dialog-cancel"
                        onClick={onCancel}
                        autoFocus
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        className="confirm-dialog-confirm"
                        onClick={onConfirm}
                    >
                        Clear My List
                    </button>
                </div>
            </section>
        </div>
    )
}

export default ClearMyListDialog
