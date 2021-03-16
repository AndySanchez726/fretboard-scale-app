const notes = ['A', 'A#', 'B', 'C', 'C#', 'D','D#', 'E', 'F', 'F#', 'G', 'G#'];
var newNotes = []

var offset = 3


const sharpNotes = function () {
    for (var i = 0; i < notes.length; i++) {
        var pointer = (i + offset) % notes.length;
        // var offsetNote = (notes[pointer]);
        var count = newNotes.push(notes[pointer])
        console.log(count)
    }  
};


const minor = function () {
    const minorArray = [notes[0], notes[2], notes[3], notes[5], notes[7], notes[8], notes[10]];
    console.log(minorArray)
}


minor();
sharpNotes();