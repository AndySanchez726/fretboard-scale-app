import React, { useState } from 'react';
import { Scale, Note, ScaleType } from '@tonaljs/tonal'


function Selector() {
    const allNotes = ['Ab', 'A', 'A#', 'Bb', 'B', 'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#']
    const allScaleTypes = ScaleType.names();
    const [formState, setFormState] = useState({noteDropdown: '', scaleDropdown:''})
    const {noteDropdown, scaleDropdown} = formState
    var fretboardChroma = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]


    function handleChange(e) {
        setFormState({...formState, [e.target.name]: e.target.value})
    }
        
    function handleSubmit(e) {
        e.preventDefault()
        console.log(Scale.get(formState.noteDropdown + ' ' + formState.scaleDropdown))
        var fullScale = Scale.get(formState.noteDropdown + ' ' + formState.scaleDropdown)
        console.log(fullScale)
        document.getElementById('noteSpan').textContent = formState.noteDropdown
        document.getElementById('scaleSpan').textContent = formState.scaleDropdown
        document.getElementById('fullScale').textContent = fullScale.notes
        var scaleChroma = fullScale.notes.map(chromaNote => (
            Note.chroma(chromaNote)
        ))
        var fretboard = document.createElement('p')
        var node = document.createTextNode(scaleChroma)
        fretboard.appendChild(node)
        document.getElementById('fretboard').appendChild(fretboard)
        var fullScaleChroma = []
        for (var i = 0; i < fullScale.notes.length; i++) {
            fullScaleChroma.push(Note.chroma(fullScale.notes[i]))
        }
        matchArrays(fretboardChroma, fullScaleChroma);
        
    }

    // hides and shows notes in the scale
    function matchArrays(base, toSearch) {
        var fretboardDiv = document.getElementById('fretboard')
        for (var i = 0; i < base.length ; i++) {
            var matchedFrets = toSearch.includes(base[i])
            if(matchedFrets) {
                var visibleFretEl = document.createElement('p')
                visibleFretEl.className = 'visible'
                var fretNode = document.createTextNode(base[i])
                visibleFretEl.appendChild(fretNode)
                fretboardDiv.appendChild(visibleFretEl)
            } else {
                var hiddenFretEl = document.createElement('p')
                hiddenFretEl.className = 'hidden'
                var fretNode = document.createTextNode(base[i])
                hiddenFretEl.appendChild(fretNode)
                fretboardDiv.appendChild(hiddenFretEl)
            }
        }
    }

    return (
        <div id='main'>
            <h1>Choose a Scale</h1>
            <form onSubmit={handleSubmit}>
                <select name="noteDropdown" id="noteDropdown" onChange={handleChange}>
                    <option disabled selected value> -Note- </option>
                    {allNotes.map(note => (
                        <option name='note' value={note}>{note}</option>
                    ))}
                </select>
                <select name="scaleDropdown" id="scaleDropdown" onChange={handleChange}>
                    <option disabled selected value> -Scale- </option>
                    {allScaleTypes.map(scale => (
                        <option name='scale' value={scale}>{scale}</option>
                    ))}
                </select>
                <button type='submit'>Go</button>
            </form>
            <p id='noteSpan'></p>
            <p id='scaleSpan'></p>
            <p id='fullScale'></p>
            <div id='fretboard'>
            </div>

        </div>
    );
}

export default Selector;