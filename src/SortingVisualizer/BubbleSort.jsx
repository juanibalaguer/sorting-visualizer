import React from 'react'

export function getAnimationsBubble(array) {
    const animations = new Array();
    animations.push([0,0])
    bubbleSort(array, animations);
    return animations;
}
// Bubble sort uses 2 nested loops, it always starts on the first element and compares it with the next element.
// If it is bigger it swaps. Swap or not it keeps going through the array.
// On each iteration of the outer loop, we get the biggest element on the array.
function bubbleSort(array, animations) {
    let pivot;
    let lastUnordered = array.length - 1; // The index of the last non-ordered element in the array. 
    for(let j = 0; j < array.length; j++) {
        for(let i = 0; i < array.length; i++) {
            if(array[i] > array[i + 1]) {
                animations.push(['compare', i, i + 1])
                animations.push(['restore', i, i + 1])
                animations.push(['swap', i, array[i + 1]])
                animations.push(['swap', i + 1, array[i]]) 
                pivot = array[i];
                array[i] = array[i + 1];
                array[i + 1] = pivot;
            }
        }
        animations.push(['final',lastUnordered]); // Here we paint the the bar in its final place and decrease the index
        lastUnordered -- ;
    }
}

export default getAnimationsBubble