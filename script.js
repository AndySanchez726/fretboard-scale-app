const notesSharp = ['A', 'A#', 'B', 'C', 'C#', 'D','D#', 'E', 'F', 'F#', 'G', 'G#'];
const notesFlat = ['A', "B♭", "B", 'C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭']
var newNotes = []

var offsetNote = 'C'

// rearranges the notes based on the offset
const offsetFunction = function () {
    for (var i = 0; i < notesSharp.length; i++) {
        if (offsetNote === notesSharp[i]) {
            console.log(offsetNote)
            var offset = i
        }
    }

    for (var i = 0; i < notesSharp.length; i++) {
        var pointer = (i + offset) % notesSharp.length;
        newNotes.push(notesSharp[pointer]);
    }  
};

// makes the minor scale based off newNotes
const minorScale = function () {
    offsetFunction();
    const minorArray = [newNotes[0], newNotes[2], newNotes[3], newNotes[5], newNotes[7], newNotes[8], newNotes[10]];
    // console.log(minorArray)
}

// makes the major scale based off newNotes
const majorScale = function () {
    offsetFunction();
    const majorArray = [newNotes[0], newNotes[2], newNotes[4], newNotes[5], newNotes[7], newNotes[9], newNotes[11]]
    console.log(majorArray)
}

// minorScale();
majorScale();
// console.log(newNotes)
