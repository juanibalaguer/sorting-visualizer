import React from 'react'

function animationHandler(bars, animation, speed, color, secondColor, restoreColor, finalColor) {
    if(animation[0] === 'pivot') {
        const barOneId = animation[1];
        const barOneStyle = bars[barOneId].style;
        setTimeout(()=> {
            barOneStyle.backgroundColor = "gold";
        }, speed)
        
    }  else if(animation[0] === 'compare' || animation[0] === 'restore') { 
            const [barOneId, barTwoId] = [animation[1], animation[2]]
            const barOneStyle = bars[barOneId].style;
            const barTwoStyle = bars[barTwoId].style;
            setTimeout(() => {
                barOneStyle.backgroundColor = animation[0] === 'compare' ? secondColor : color
                barTwoStyle.backgroundColor = animation[0] === 'compare' ? secondColor : restoreColor
                } , speed )
                 
    } else if(animation[0] === 'swap') {
            const [barOneId, newHeight] = [animation[1],animation[2]];
            const barOneStyle = bars[barOneId].style;
            setTimeout(() => {
            barOneStyle.height = `${newHeight}px`;
            }, speed)
        } else if (animation[0] === 'pivotswap') {
            const [barOneId, newHeight] = [animation[1],animation[2]];
            const barOneStyle = bars[barOneId].style;
            setTimeout(() => {
            barOneStyle.height = `${newHeight}px`;
            if(barOneStyle.backgroundColor === "black") {
                barOneStyle.backgroundColor = color;
            } else {
                barOneStyle.backgroundColor = finalColor;
            }
             }, speed)
        } else if (animation[0] === 'final') {

            const barOneId = animation[1]
            const barOneStyle = bars[barOneId].style;
            setTimeout(()=> {
                barOneStyle.backgroundColor = finalColor;

            }, speed)
        } else if (animation[0] === 'finalmerge') {

            const [barOneId, newHeight] = [animation[1], animation[2]];
            const barOneStyle = bars[barOneId].style;
            setTimeout(() => {
                barOneStyle.height = `${newHeight}px`;
                barOneStyle.backgroundColor = finalColor;
            }, speed);
        } else if (animation[0] === 'lastswap') {
            const [barOneId, barOneHeight] = [animation[1], animation[2]]
            const [barTwoId, barTwoHeight] = [animation[3], animation[4]]
            const barOneStyle = bars[barOneId].style
            const barTwoStyle = bars[barTwoId].style
            setTimeout(() => {
                barOneStyle.height = `${barOneHeight}px`
                barTwoStyle.height = `${barTwoHeight}px`
                barTwoStyle.backgroundColor = finalColor;
            }, speed)
        } else if (animation[0] === 'heapswap') { 
            const [barOneId, barOneHeight] = [animation[1], animation[2]]
            const [barTwoId, barTwoHeight] = [animation[3], animation[4]]
            const barOneStyle = bars[barOneId].style
            const barTwoStyle = bars[barTwoId].style
            setTimeout(() => {
                barOneStyle.height = `${barOneHeight}px`
                barTwoStyle.height = `${barTwoHeight}px`
            }, speed)

        }

}

export default animationHandler