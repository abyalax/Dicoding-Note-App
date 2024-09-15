import PropTypes from "prop-types"
import NoteItem from "./NoteItem";

function NoteList({ notes, onDelete, onArchived, unArchived }) {

  const sortedNotes = notes.filter((note) => note.archived === false)

  return (
    <div className="note-list">
      {sortedNotes.length > 0 ? 
        sortedNotes.map((note) => (
          <NoteItem
            archived={note.archived}
            unArchived={unArchived}
            createdAt={note.createdAt}
            key={note.id}
            id={note.id}
            onDelete={onDelete}
            onArchived={onArchived}
            {...note} />
        ))
        : (
          <p>Tidak ada catatan</p>
        )
      }
    </div>
  );
}


NoteList.propTypes = {
  notes: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchived: PropTypes.func.isRequired,
  unArchived: PropTypes.func.isRequired,
}

export default NoteList;