import PropTypes from "prop-types"
import NoteItem from "./NoteItem"
import SearchBar from "./SearchBar";
import { useState } from "react";

function ArchivedList({ notes, onDelete, open, toggleOpen, unArchived, onArchived }) {
    const [search, setSearch] = useState('')

    const sortedNotes = notes.filter((note) => note.archived === true)

    const filteredNotes = sortedNotes.filter((note) => {
        return note.title.toLowerCase().includes(search.toLowerCase()) || note.body.toLowerCase().includes(search.toLowerCase())
    })

    return (
        <div className={open ? "archived" : "hide"}>
            <div className="archived-list">
                <div className="archived-title">
                    <button className={open ? "close" : "hide"} onClick={toggleOpen}>
                        X
                    </button>
                    <h2>Daftar Catatan Arsip</h2>
                </div>
                <SearchBar setSearch={setSearch} />
                {filteredNotes.length > 0 ? filteredNotes.map((note) => (
                    <NoteItem
                        onArchived={onArchived} unArchived={unArchived}
                        key={note.id}
                        id={note.id}
                        onDelete={onDelete}
                        {...note} />
                )) : (
                    <p>Tidak ada catatan arsip</p>
                )}
            </div>
        </div>
    );
}


ArchivedList.propTypes = {
    notes: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    toggleOpen: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    setSearch: PropTypes.func.isRequired,
    onArchived: PropTypes.func.isRequired,
    unArchived: PropTypes.func.isRequired,
}

export default ArchivedList;