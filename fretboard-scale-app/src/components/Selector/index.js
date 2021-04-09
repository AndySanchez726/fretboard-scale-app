import React, { useState } from 'react';
import { Scale, Note, ScaleType } from '@tonaljs/tonal';
import { tunings } from '../../assets/tunings.js'
import { Button, Container, Row, Col } from 'react-bootstrap'


function Selector() {
    const allNotes = ['Ab', 'A', 'A#', 'Bb', 'B', 'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#']
    const allScaleTypes = ScaleType.names();
    const [formState, setFormState] = useState({noteDropdown: '', scaleDropdown:'', stringNoteDropdown: '', numberOfStringsDropdown: '', tuningDropdown:['']})
    const {noteDropdown, scaleDropdown} = formState
    var fretboardChroma = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    var stringOffsetArray = []
    const scaleArray = []

    function handleChange(e) {
        setFormState({...formState, [e.target.name]: e.target.value})
    }
        
    function handleSubmit(e) {
        e.preventDefault()
        var fretboardDiv = document.getElementById('fretboard')
        // clears fretboard
        while(fretboardDiv.firstChild) {
            fretboardDiv.removeChild(fretboardDiv.firstChild)
        }
        var stringNote = Note.chroma(formState.stringNoteDropdown)
        var fullScale = Scale.get(formState.noteDropdown + ' ' + formState.scaleDropdown)
        var tuningArray = formState.tuningDropdown.split(/(?=[A-Z])/)
        var tuningChroma = []
        // turns selected tuning into chroma
        for ( var i = 0; i < tuningArray.length; i++) {
            tuningChroma.push(Note.chroma(tuningArray[i]))
        }
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
        // creates object for the scale
        for (var i = 0; i < fullScale.notes.length; i++) {
            fullScaleChroma.push(Note.chroma(fullScale.notes[i]))
            const scaleObject = new Object();
            scaleObject.chroma = Note.chroma(fullScale.notes[i])
            scaleObject.name = fullScale.notes[i]
            scaleArray.push(scaleObject)
        }
        var noteChroma = Note.chroma(formState.noteDropdown)
        offsetFunction(tuningChroma, fretboardChroma)
        matchArrays(stringOffsetArray, fullScaleChroma, formState.numberOfStringDropdown, fullScale);
    }

    // hides and shows notes in the scale
    function matchArrays(base, toSearch, stringNumber, fullScale) {
        // reverses the orientation of the strings 
        var reverseBase = base.reverse();
        var fretboardDiv = document.getElementById('fretboard')
        // loop through strings 
        for ( var j = 0; j < base.length; j++) {
            var  string = 'string' + j
            string = document.createElement('div')
            string.className = ('String', 'row')
            fretboardDiv.appendChild(string)
            var newStringArray = (base[j].[0])
            // loop through notes on string match to scale chroma
            for (var i = 0; i < newStringArray.length ; i++) {   
                var noteDiv = document.createElement('div')
                noteDiv.className = 'col-sm-1'
                for (var p = 0; p < scaleArray.length; p++) {
                    var matchedFrets = scaleArray[p].chroma === newStringArray[i]
                    if(matchedFrets) {
                        break;
                    }
                }
                if(matchedFrets) {
                    var visibleFretEl = document.createElement('span')
                    visibleFretEl.className = 'visible'
                    var fretNode = document.createTextNode(scaleArray[p].name)
                    visibleFretEl.appendChild(fretNode)
                    noteDiv.appendChild(visibleFretEl)
                    string.appendChild(noteDiv)
                } else {
                    var hiddenFretEl = document.createElement('span')
                    hiddenFretEl.className = 'hidden'
                    var fretNode = document.createTextNode(newStringArray[i])
                    hiddenFretEl.appendChild(fretNode)
                    noteDiv.appendChild(hiddenFretEl)
                    string.appendChild(noteDiv)
                }   
            }
        }
            var frets = document.createElement('div')
            frets.className = 'row'
            for(var i = 0; i<12; i++) {
                var fret = document.createElement('div')
                fret.className = 'col'
                fret.innerHTML = i+1
                frets.appendChild(fret)
            }
            fretboardDiv.appendChild(frets)


    }
    // rearranges the fretboard based on the offset
    const offsetFunction = function (root, array) {
        for (var j = 0; j < root.length; j++) {
            var stringChromaOffset = []
            stringOffsetArray.push([stringChromaOffset])
            for (var i = 0; i < array.length; i++) {
                if (root[j] === array[i]) {
                    var offset = i
                }
            }
            for (var i = 0; i < array.length; i++) {
                var pointer = (i + offset) % array.length;
                stringChromaOffset.push(array[pointer]);
            }  
        }
    };

    return (
        <div id='main'>
            <h1>Choose a Scale</h1>
            <form onSubmit={handleSubmit}>
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
                <select name='tuningDropdown' id='tuningDropdown' onChange={handleChange}>
                    <option disabled selected value> -Tunings- </option>
                    {tunings.map(tuning => (
                        <option name={tuning.tuning}>{[tuning.tuning]}</option>
                    ))}
                </select>
                <Button type='submit' variant='primary'>Go</Button>
            </form>
            <p id='noteSpan'></p>
            <p id='scaleSpan'></p>
            <p id='fullScale'></p>
            {/* <div id='fretboard'></div> */}
            <Container id='fretboard'>
                <Row>
                    <Col>Note</Col>
                    <Col>Note 2</Col>
                </Row>
            </Container>
            
            <Col />

        </div>
    );
}

export default Selector;