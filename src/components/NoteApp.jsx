import { useState } from 'react';
import { getData } from '../utils/data';
import "../styles/index.css";
import ArchivedList from './ArchivedList';
import NoteList from "./NoteList";
import NoteInput from "./NoteInput";
import Navbar from './Navbar';

function NoteApp() {
    const [notes, setNotes] = useState(getData());
    const [search, setSearch] = useState('')
    const [open, setOpen] = useState(false);

    const onDeleteHandler = (id) => {
        const updatedNotes = notes.filter(note => note.id !== id);
        setNotes(updatedNotes);
    };

    const onAddNoteHandler = ({ title, body }) => {
        setNotes(prevNotes => [
            ...prevNotes,
            {
                id: +new Date(),
                title,
                body,
                archived: false,
                createdAt: new Date().toISOString(),
            }
        ]);
    };

    const ArchiveNoteHandler = ({ title, body }) => {
        console.log({ title, body });
        const tes = notes.map((item) => {
            if (item.title === title && item.body === body) {
                return { ...item, archived: true };
            }
            return item;
        })
        setNotes(tes);
    }

    const UnarchiveNoteHandler = ({ title, body }) => {
        console.log({ title, body });
        const tes = notes.map((item) => {
            if (item.title === title && item.body === body) {
                return { ...item, archived: false };
            }
            return item;
        })
        console.log({ tes })
        setNotes(tes);
    }

    const onOpenArchivedHandler = () => {
        setOpen(!open);
    };

    const filteredNotes = notes.filter((note) => {
        return note.title.toLowerCase().includes(search.toLowerCase()) || note.body.toLowerCase().includes(search.toLowerCase())
    })

    return (
        <div className='container-page'>
            <Navbar setSearch={setSearch} onOpenArchivedHandler={onOpenArchivedHandler} />
            <div className="note-app">
                <h2>Tambah Catatan</h2>
                <NoteInput addNote={onAddNoteHandler} />

                <h2>Daftar Catatan</h2>
                {notes.length > 0 ? (
                    <NoteList notes={filteredNotes} onDelete={onDeleteHandler} onArchived={ArchiveNoteHandler} unArchived={UnarchiveNoteHandler} />
                ) : (
                    <p>Tidak ada catatan</p>
                )}
            </div>
            <div>
                <ArchivedList notes={notes} setSearch={setSearch} open={open} toggleOpen={onOpenArchivedHandler} onArchived={ArchiveNoteHandler} unArchived={UnarchiveNoteHandler} onDelete={onDeleteHandler} />
            </div>
        </div>

    );
}

export default NoteApp;