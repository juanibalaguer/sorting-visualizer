import React from 'react'

export function getAnimationsQS(array) {
    const animations = new Array();
    quickSort(array,0,array.length - 1, animations);
    return animations;
    
}

export function quickSort(array, lower, higher, animations) {
    if (lower <= higher) {
        const p = partition(array, lower, higher, animations);
        quickSort(array, lower, p - 1, animations);
        quickSort(array, p + 1, higher, animations);
    }

}

export function partition(array, lower, higher,animations) {
    const pivot = array[higher];
    animations.push(['pivot', higher])
    let i = lower - 1;
    let aux;
    for (let j = lower; j <= higher - 1; j++) {
        if(array[j] <= pivot) {
            animations.push(['compare',j, higher]);
            animations.push(['restore',j, higher]);
            i++;
            animations.push(['swap',j, array[i]]);
            animations.push(['swap',i, array[j]]);
            aux = array[i];
            array[i] = array[j];
            array[j] = aux;
            
        }
    }

    animations.push(['pivotswap',higher, array[i+1]])
    animations.push(['pivotswap',i+1, array[higher]])
    aux = array[higher];
    array[higher] = array[i+1];
    array[i+1] = aux;
    return i + 1;
    
}



export default getAnimationsQS

