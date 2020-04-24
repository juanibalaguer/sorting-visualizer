import React from 'react'


function getAnimationsHeap(array) {
    const animations = new Array();
    heapSort(array, array.length , animations)
    console.log(animations)
    return animations;
}

export function heapSort(array, arraysize, animations) {
    let temp;
    constructMaxHeap(array, arraysize, animations); // Turns the given array into a maxHeap
    for (let i = arraysize - 1 ; i >= 0; i--) {
        animations.push(['lastswap', 0, array[i], i, array[0]]);
        temp = array[0];
        array[0] = array[i]; //Pushes the first element, which is the biggest one, to the last array position
        array[i] = temp;
        arraysize--;         // Decreases the arraysize so we don't take into account the largest item
        maxHeapify(array, 0, arraysize, animations);       // Calling maxHeapify we get the largest item on 1st index
        
    }
     

}
// Calls maxHeapify from middle index to 1
// The second half are all leaves, which are maxHeaps by definition

export function constructMaxHeap(array, arraysize, animations) {
        for (let i = Math.floor(arraysize - 1 / 2); i >= 0; i--) {
                maxHeapify(array, i, arraysize, animations);

        }        
}

       

function maxHeapify(array, index, arraysize, animations) {
    let largest;
    let left = index * 2 + 1;
    let right = index * 2 + 2 < arraysize ? index * 2 + 2 : null ;


    if (left < arraysize) {
        animations.push(['compare', left, index])
        animations.push(['restore', left, index])
    }

    if (left < arraysize && array[left] > array[index]) {
        largest = left
        
    } else largest = index;
    
    if (right < arraysize && right !== null) {
        animations.push(['compare', right, largest])
        animations.push(['restore', right, largest])
    }
    if (right < arraysize && array[right] > array[largest]) {
        largest = right;
    }
    
    if (largest !== index) {
        animations.push(['heapswap', index, array[largest], largest, array[index]])
        let aux = array[largest]
        array[largest] = array[index];
        array[index] = aux;
        // We call maxHeapify recursively since we may alter the maxHeap in between swaps
        maxHeapify(array, largest, arraysize, animations);
    }

}


        
export default getAnimationsHeap


    