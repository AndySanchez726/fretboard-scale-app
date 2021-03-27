import React, { useState } from 'react';
import { Scale, Note, ScaleType } from '@tonaljs/tonal'


function Selector() {
    const allNotes = ['Ab', 'A', 'A#', 'Bb', 'B', 'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#']
    const allScaleTypes = ScaleType.names();
    const [formState, setFormState] = useState({noteDropdown: '', scaleDropdown:'', stringNoteDropdown: '', numberOfStringsDropdown: ''})
    const {noteDropdown, scaleDropdown} = formState
    var fretboardChroma = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    var newArray = []
    var numberOfStrings = ['4', '5', '6', '7', '8', '9']



    function handleChange(e) {
        setFormState({...formState, [e.target.name]: e.target.value})
    }
        
    function handleSubmit(e) {
        e.preventDefault()
        var stringNote = Note.chroma(formState.stringNoteDropdown)
        var fullScale = Scale.get(formState.noteDropdown + ' ' + formState.scaleDropdown)
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
        var noteChroma = Note.chroma(formState.noteDropdown)
        offsetFunction(stringNote, fretboardChroma)
        matchArrays(newArray, fullScaleChroma, formState.numberOfStringDropdown);
        
    }

    // hides and shows notes in the scale
    function matchArrays(base, toSearch, stringNumber) {
        var fretboardDiv = document.getElementById('fretboard')
        for ( var j = 0; j < stringNumber; j++) {
            var  string = 'string' + j
            string = document.createElement('div')
            fretboardDiv.appendChild(string)
            for (var i = 0; i < base.length ; i++) {
                var matchedFrets = toSearch.includes(base[i])
                if(matchedFrets) {
                    var visibleFretEl = document.createElement('span')
                    visibleFretEl.className = 'visible'
                    var fretNode = document.createTextNode(base[i])
                    visibleFretEl.appendChild(fretNode)
                    string.appendChild(visibleFretEl)
                } else {
                    var hiddenFretEl = document.createElement('span')
                    hiddenFretEl.className = 'hidden'
                    var fretNode = document.createTextNode(base[i])
                    hiddenFretEl.appendChild(fretNode)
                    string.appendChild(hiddenFretEl)
                }
            }
        }
    }
    // rearranges the fretboard based on the offset
    const offsetFunction = function (root, array) {
        for (var i = 0; i < array.length; i++) {
            if (root === array[i]) {
                var offset = i
            }
        }
        for (var i = 0; i < array.length; i++) {
            var pointer = (i + offset) % array.length;
            newArray.push(array[pointer]);
        }  
        return newArray
    };

    return (
        <div id='main'>
            <h1>Choose a Scale</h1>
            <form onSubmit={handleSubmit}>
                {/* number of strings */}
                <select name='numberOfStringDropdown' id='numberOfStringDropdown' onChange={handleChange}>
                    <option disabled selected value> -# of Strings- </option>
                    {numberOfStrings.map(string => (
                        <option name='string' value={string}>{string}</option>
                    ))}
                </select>
                {/* string note */}
                <select name='stringNoteDropdown' id='stringNoteDropdown' onChange={handleChange}>
                    <option disabled selected value> -String Note- </option>
                    {allNotes.map(stringNote => (
                        <option name='stringNote' value={stringNote}>{stringNote}</option>
                    ))}
                </select>
                {/* root note dropdown */}
                <select name="noteDropdown" id="noteDropdown" onChange={handleChange}>
                    <option disabled selected value> -Note- </option>
                    {allNotes.map(note => (
                        <option name='note' value={note}>{note}</option>
                    ))}
                </select>
                {/* scale dropdown */}
                <select name="scaleDropdown" id="scaleDropdown" onChange={handleChange}>
                    <option disabled selected value> -Scale- </option>
                    {allScaleTypes.map(scale => (
                        <option name='scale' value={scale}>{scale}</option>
                    ))}
                </select>
                <select name='tuningDropdown'>
                    <option disabled selected value> -Tunings- </option>
                    <option disabled value=''>-- Guitar --</option>
                    <option value='Standard'>Standard</option>
                    <option>Drop B</option>
                    <option disabled value=''>-- Bass --</option>
                    <option>Bass</option>
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