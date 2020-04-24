import React from 'react'

export function getAnimationsI(array) {
    const animations = new Array();
    insertionSort(array, animations);
    return animations;
}

export function insertionSort(array, animations) {
    let j; 

    for (let i = 1; i < array.length; i++) {
        j = i;
        let pivot; 
        while (j > 0 && (array[j] < array[j-1])) {
            if (j <= i) {
                animations.push(['compare', j, j-1,])
                animations.push(['restore', j, j-1, 'finalcolor'])
                animations.push(['swap', j, array[j-1]])
                animations.push(['swap', j-1, array[j]])
                animations.push(['final', j, array[j-1]])
                animations.push(['final', j-1, array[j]])
            } else {
                animations.push(['compare', j, j-1])
                animations.push(['restore', j, j-1, 'color']);
            }
            
            pivot = array[j];
            array[j] = array[j-1];
            array[j-1] = pivot;
            j--;
        }
    }
}

export default getAnimationsI