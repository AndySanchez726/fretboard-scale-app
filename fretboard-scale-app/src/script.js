import { Note, ScaleType, Scale } from "@tonaljs/tonal";

// const allNotes = ['A♭', 'A', 'A#', 'B♭', 'B', 'C', 'C#', 'D♭', 'D', 'D#', 'E♭', 'E', 'F', 'F#', 'G♭', 'G', 'G#']
// const notesSharp = ['A', 'A#', 'B', 'C', 'C#', 'D','D#', 'E', 'F', 'F#', 'G', 'G#'];
// const notesFlat = ['A', "B♭", "B", 'C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭']
// var newNotes = []
// const majorSharp = ['A', 'B', 'C', 'D', 'E', 'G']
// const minorSharp = [ 'A#','B', 'C', 'D#', 'E', 'F#', 'G#']

// var selectedRoot = 'F#'
// var selectedScale = 'Major'

// console.log(Note.get('C4'))
// console.log(Scale.get('c chromatic'))




// const findScale = function (root, scale) {

//     // checks if root note is sharp or flat, if not uses findNoteArray();
//     var checkSharp = root.includes('#');
//     var checkFlat = root.includes('♭');
//     if(checkSharp) {
//         console.log('use notesSharp')
//         offsetFunction(root, notesSharp)
//         if (scale === 'Major') {
//             majorScale();
//         } else {
//             minorScale();
//         }
//     } else if (checkFlat){
//         console.log('use notesFlat')
//                 if (scale === 'Major') {
//             majorScale();
//         } else {
//             minorScale();
//         }
//         offsetFunction(root, scale)
//     } else {
//         findNoteArray(root, scale);
//     }
// }

// const findNoteArray = function (root, scale) {
//     if (scale === 'Major') {
//         var checkMajor = majorSharp.includes(root)
//         if(checkMajor) {
//             console.log('use sharp array for major')
//             offsetFunction(root, notesSharp)
//             majorScale();
//         } else {
//             offsetFunction(root, notesFlat)
//             majorScale();
//             console.log('use flat array for major')
//         }
//     } else if (scale === 'Minor') {
//         var checkMinor = minorSharp.includes(root)
//         if (checkMinor) {
//             offsetFunction(root, notesSharp)
//             minorScale();
//             console.log('use sharp array for minor')
//         } else {
//             offsetFunction(root, notesFlat)
//             minorScale();
//             console.log('use flat array for minor')
//         }
//     }
// }
 

// // rearranges the notes based on the offset
// const offsetFunction = function (root, array) {
//     for (var i = 0; i < array.length; i++) {
//         if (root === array[i]) {
//             console.log(root)
//             var offset = i
//         }
//     }

//     for (var i = 0; i < array.length; i++) {
//         var pointer = (i + offset) % array.length;
//         newNotes.push(array[pointer]);
//     }  
//     console.log(newNotes)
// };

// // makes the minor scale based off newNotes
// const minorScale = function () {
//     // offsetFunction();
//     // const minorArray = [newNotes[0], newNotes[2], newNotes[3], newNotes[5], newNotes[7], newNotes[8], newNotes[10]];
//     const minorArray = [newNotes[0,2,3,5,7,8,10]];
//     console.log(minorArray)
// }

// // makes the major scale based off newNotes
// const majorScale = function () {
//     // offsetFunction();
//     const majorArray = [newNotes[0], newNotes[2], newNotes[4], newNotes[5], newNotes[7], newNotes[9], newNotes[11]]
//     console.log(majorArray)
// }

// // minorScale();
// findScale(selectedRoot, selectedScale);
// // majorScale();
// // console.log(newNotes)
