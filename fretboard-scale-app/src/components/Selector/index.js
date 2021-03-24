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
        var newArray = matchArrays(fretboardChroma, scaleChroma)
        console.log(newArray)
        
        // var newArrayEl = document.createElement('span').textContent = newArray
        // document.getElementById('fretboard').appendChild(newArrayEl)
    }
    // function to match scaleChroma to fretboard
    function matchArrays(base, toSearch) {
        var returnArray = [];
        for (var i = 0; i < toSearch.length; i++) {
            if(base.indexOf(toSearch[i]) !== -1) returnArray.push(toSearch[i]);
        }
        return returnArray;
    }
    return (
        <div>
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
                <p id='fretZero' class='visible'>0</p>
                <p id='fretOne' class='visible'>1</p>
                <p id='fretTwo' class='visible'>2</p>
                <p id='fretThree' class='visible'>3</p>
                <p id='fretFour' class='visible'>4</p>
                <p id='fretFive' class='visible'>5</p>
                <p id='fretSix' class='visible'>6</p>
                <p id='fretSeven' class='visible'>7</p>
                <p id='fretEight' class='visible'>8</p>
                <p id='fretNine' class='visible'>9</p>
                <p id='fretTen' class='visible'>10</p>
                <p id='fretEleven' class='visible'>11</p>
            </div>

        </div>

    );
}

export default Selector;