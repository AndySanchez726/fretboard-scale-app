import React, { useState } from 'react';
import { Scale, Note, ScaleType } from '@tonaljs/tonal'


function Selector() {
    const allNotes = ['Ab', 'A', 'A#', 'Bb', 'B', 'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#']
    const allScaleTypes = ScaleType.names();
    const [formState, setFormState] = useState({noteDropdown: '', scaleDropdown:''})
    const {noteDropdown, scaleDropdown} = formState

    function handleChange(e) {
        setFormState({...formState, [e.target.name]: e.target.value})
    }
        
    function handleSubmit(e) {
        e.preventDefault()
        console.log(formState)
    }

    return (
        <div>
            <h1>Choose a Scale</h1>
            <form onSubmit={handleSubmit}>
                <select name="noteDropdown" id="noteDropdown" onChange={handleChange}>
                    {allNotes.map(note => (
                        <option name='note' value={note}>{note}</option>
                    ))}
                </select>
                <select name="scaleDropdown" id="scaleDropdown" onChange={handleChange}>
                    {allScaleTypes.map(scale => (
                        <option name='scale' value={scale}>{scale}</option>
                    ))}
                </select>
                <button type='submit'>Go</button>
            </form>
        </div>

    );
}

export default Selector;