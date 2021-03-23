import React from 'react';
import { Scale, Note } from '@tonaljs/tonal'

function Selector() {
    const allNotes = ['Ab', 'A', 'A#', 'Bb', 'B', 'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#']
    var noteDropdown = document.getElementById('noteDropdown')
    for (var i = 0; i < allNotes.length; i++) {
        var note = allNotes[i];
        var noteEl = document.createElement('option');
        noteEl.textContent = note;
        noteEl.value = note;
        noteDropdown.appendChild(noteEl);
    }

    console.log(Note.get('Ab'))
    return (
        <div>
            <h1>Choose a Scale</h1>

            <select name="noteDropdown" id="noteDropdown"></select>
        </div>

    );
}

export default Selector;