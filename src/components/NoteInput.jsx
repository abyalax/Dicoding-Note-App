import React from 'react';
import PropTypes from 'prop-types';

class NoteInput extends React.Component {
    constructor(props) {
        super(props);

        // inisialisasi state
        this.state = {
            title: '',
            body: '',
            archived: false
        }
        this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
        this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
    }

    onTitleChangeEventHandler(event) {
        if (event.length > 50) {
            return `Title can't be more than 50 characters`;
        } else {
            this.setState(() => {
                return {
                    title: event.target.value,
                }
            });
        }
    }

    onBodyChangeEventHandler(event) {
        this.setState(() => {
            return {
                body: event.target.value,
            }
        });
    }


    onSubmitEventHandler(event) {
        event.preventDefault();
        this.props.addNote(this.state);
    }

    render() {
        return (
            <form className='note-input' onSubmit={this.onSubmitEventHandler}>
                {this.state.title.length >= 50 ? <p style={{ color: 'red', textAlign: 'end' }}>{"Title can't be more than 50 characters"}</p> : <p style={{ textAlign: 'end' }}>Sisa Karakter : {50 - this.state.title.length}</p>}
                <input type="text" placeholder="Title Note" value={this.state.title} onChange={(e) => {
                    if (e.target.value.length <= 50) {
                        this.onTitleChangeEventHandler(e);
                    }
                }} />
                <textarea className='text-area' type="text" placeholder="Tambahkan isi note disini" value={this.state.body} onChange={this.onBodyChangeEventHandler} />
                <button type="submit" className='btn'>Tambah</button>
            </form>
        )
    }
}

NoteInput.propTypes = {
    addNote: PropTypes.func.isRequired
}

export default NoteInput;