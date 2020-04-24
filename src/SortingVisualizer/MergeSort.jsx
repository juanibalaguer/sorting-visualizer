import React from 'react'
// Function that calls mergeSort and returns an array of animations
export function getAnimations(array) {
    const animations = [];
    mergeSort(array,0, array.length - 1, animations);
    return animations;
}

export function merge (array, startId, midId, endId, animations) {
    // We copy the first half of the array on an empty array 
    let firstHalf = [];
    for (let i = startId; i <= midId; i++) {
        firstHalf.push(array[i]);
    }
    // we copy the second half of the array on an empty array
    let secondHalf = [];
    for (let j = midId + 1; j <= endId; j++) {
        secondHalf.push(array[j]);
    }
    // We initiate first and secondcounters to 0, to go throught both copies made in the previous steps.
    // Maincounter is the counter of the original array. We initiate it with firstId
    let firstCounter = 0;
    let secondCounter = 0 ;
    let mainCounter = startId;
    // We compare each the items from the copies to see which one is smaller, and place it on the original array
    while (firstCounter < firstHalf.length && secondCounter < secondHalf.length) {
        // The 'compare' animation takes the bars that are being compared and highlights them. Then we restore it
        // to the origianl color ('restore' tag)
        // When the endId we recieve equals the original array length and startId equals 0, it means that we are 
        // starting the last merge, which means that the numbers are being placed in their final position. We pass
        // this information with the 'final' tag and paint the bars in a final sorted color
        animations.push(['compare', mainCounter, midId + 1 + secondCounter ]);
        animations.push(['restore', mainCounter, midId + 1 + secondCounter ]);
        if (firstHalf[firstCounter] <= secondHalf[secondCounter]) {
            if (endId === array.length - 1 && startId === 0) {
                animations.push(['finalmerge', mainCounter, firstHalf[firstCounter]]);
            } else {
                animations.push(['swap', mainCounter, firstHalf[firstCounter] ]);
            }
            array[mainCounter] = firstHalf[firstCounter];
            mainCounter ++;
            firstCounter ++;
        } else {
            if (endId === array.length - 1 && startId === 0) {
                animations.push(['finalmerge', mainCounter, secondHalf[secondCounter]]);
            } else {
                animations.push(['swap', mainCounter, secondHalf[secondCounter]]);
            }
            array[mainCounter] = secondHalf[secondCounter];
            mainCounter ++;
            secondCounter ++;
        }
    }
    // Once one of the halves is empty, we go through the other and place each remaining number 
    // on the array
    while (firstCounter < firstHalf.length) {
        animations.push(['compare', mainCounter, mainCounter]);
        if (endId === array.length - 1 && startId === 0) {
            animations.push(['finalmerge', mainCounter, firstHalf[firstCounter]])
        } else {
            animations.push(['swap', mainCounter, firstHalf[firstCounter]])
            animations.push(['restore', mainCounter, mainCounter]);
        }
        
        array[mainCounter] = firstHalf[firstCounter];
        mainCounter ++;
        firstCounter ++;
    }

    while (secondCounter < secondHalf.length) {
        animations.push(['compare', midId + 1 + secondCounter, midId + 1 +secondCounter]);
        if (endId === array.length - 1 && startId === 0) {
            animations.push(['finalmerge', mainCounter, secondHalf[secondCounter]]);
        } else {
            animations.push(['swap', mainCounter, secondHalf[secondCounter]]);
            animations.push(['restore', midId + 1 + secondCounter, midId + 1 + secondCounter]);
        }
        
        array[mainCounter] = secondHalf[secondCounter];
        mainCounter ++;
        secondCounter ++;

    }

}


export function mergeSort(
    array,
    first,
    last,
    animations,
) {
    // Merge sort divides the original array in two halves recursively and then merges them when they are sorted
    // When the first id equals  the last id, it means we have reached halves of size 1. By definition an array of
    // size 1 is sorted, so we start merging. Since merge returns a sorted array given two sorted arrays,
    // once we finish the recursive calls we have sorted the original array.


    // we check to return when first and last ids are equal, to return and avoid an infinite loop
    if (first === last) return
    // We "divide" the array in two by getting the mid ID and calling mergeSort with midID as the first item 
    // and the last item
    const mid = Math.floor((first + last) / 2)
    mergeSort(array, first, mid, animations)
    mergeSort(array, mid +1 , last, animations)
    merge(array, first, mid , last, animations )
    


}
export default getAnimations 