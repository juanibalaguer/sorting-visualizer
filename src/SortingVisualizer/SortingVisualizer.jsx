import React from 'react';
import './SortingVisualizer.css';
import getAnimations from './MergeSort.jsx'
import getAnimationsI from './InsertionSort.jsx'
import getAnimationsBubble from './BubbleSort.jsx'
import getAnimationsQS from './QuickSort.jsx';
import  getAnimationsHeap from './Heap.jsx'
import animationHandler from './AnimationHandlers';

const COLOR = "white";
const SECOND_COLOR = "deeppink";
const FINAL_COLOR = 'rgb(0, 221, 129)';
let running = false;

class SortingVisualizer extends React.Component {
    
    constructor(props) 
    {   
        
        super(props);

        this.state = {
         array: [],
         numberOfBars: 150,
         ANIM_SPEED: 3,
        } ;
       
        this.sliderHandler = this.sliderHandler.bind(this);
        this.speedHandler = this.speedHandler.bind(this);
}
    componentDidMount() {
        this.resetArray(this.state.numberOfBars);

    }

    resetColor() {
        const bars = document.getElementsByClassName("array-bar");
        for (let i = 0; i < bars.length; i++) {
            bars[i].style.backgroundColor = COLOR;
        }
    }

    resetArray(numberOfBars) {
        const array = [];
        for (let i = 0; i < numberOfBars; i++) {
            array.push(this.randomBetween(20, 550));
        }
        this.setState({array});
        this.resetColor();
        
        
    }


    mergeSort() {   
        this.disableButtons();
        let totalTime = 0;
        const animations = getAnimations(this.state.array);
        const bars = document.getElementsByClassName("array-bar");
        for (let i = 0; i < animations.length; i++) {
            
            animationHandler(bars, animations[i], i * this.state.ANIM_SPEED, COLOR, SECOND_COLOR, COLOR, FINAL_COLOR)

        }
        setTimeout(this.enableButtons, this.state.ANIM_SPEED * animations.length)
    }

    insertionSort() {
        this.disableButtons();
        const animations = getAnimationsI(this.state.array);
        const bars = document.getElementsByClassName("array-bar");
        for (let i = 1; i < animations.length; i++) {
            
            animationHandler(bars, animations[i], i * this.state.ANIM_SPEED, COLOR, SECOND_COLOR, FINAL_COLOR, FINAL_COLOR);
        
        }  
        setTimeout(this.enableButtons, this.state.ANIM_SPEED * animations.length)

    }

    bubbleSort() {
        this.disableButtons();
        console.log(running.toString())
        const animations = getAnimationsBubble(this.state.array);
        const bars = document.getElementsByClassName("array-bar");
        for (let i = 1; i < animations.length; i++) {
            
            animationHandler(bars, animations[i], i * this.state.ANIM_SPEED, COLOR, SECOND_COLOR, COLOR, FINAL_COLOR);
       
        } 
        setTimeout(this.enableButtons, this.state.ANIM_SPEED * animations.length)
    }
    quickSort() {
        this.disableButtons();
        const animations = getAnimationsQS(this.state.array);
        const bars = document.getElementsByClassName("array-bar");   
        for (let i = 0; i < animations.length; i++) {
            
            animationHandler(bars, animations[i], i * this.state.ANIM_SPEED, COLOR, SECOND_COLOR, 'gold', FINAL_COLOR);

        }
        setTimeout(this.enableButtons, this.state.ANIM_SPEED * animations.length)
    }

    heapSort() {
        this.disableButtons();
        const animations = getAnimationsHeap(this.state.array)
        const bars = document.getElementsByClassName("array-bar");
        for (let i = 0; i < animations.length; i++) {
            
            animationHandler(bars, animations[i], i * this.state.ANIM_SPEED, COLOR, SECOND_COLOR, COLOR, FINAL_COLOR)

        }
        setTimeout(this.enableButtons, this.state.ANIM_SPEED * animations.length)
    }

    sliderHandler(event) {
        const value = event.target.value
        this.resetArray(value);

    }
    speedHandler(event) {
        const value = event.target.value;
        this.setState({ANIM_SPEED: value});
    }

    disableButtons() {
        document.getElementById("mergeSort").disabled = true;
        document.getElementById("insertionSort").disabled = true;
        document.getElementById("quickSort").disabled = true;
        document.getElementById("heapSort").disabled = true;
        document.getElementById("bubbleSort").disabled = true;
        document.getElementById("newArray").disabled = true;
        document.getElementById("speedbar").disabled = true;
        document.getElementById("arraybar").disabled = true;
        
    }

    enableButtons() {
        document.getElementById("mergeSort").disabled = false
        document.getElementById("insertionSort").disabled = false;
        document.getElementById("quickSort").disabled = false
        document.getElementById("heapSort").disabled = false
        document.getElementById("bubbleSort").disabled = false
        document.getElementById("newArray").disabled = false
        document.getElementById("speedbar").disabled = false;
        document.getElementById("arraybar").disabled = false;
    }

    randomBetween(max, min) {
        return Math.round(Math.random() * (max - min) + min);
    }

    render() {
        let array = this.state.array;
        return (
        <div>
            <div className="bar-container">
             {array.map((value, id) => (
                    <div
                        className="array-bar"
                        key={id}
                        style={{
                        backgroundColor: COLOR,
                        height: `${value}px`,
                        width: '20px'
                    }}> 
                    </div>
            )
            )}
            </div> 
            <div id="toolbar">
                <div id="sliders">
                    <div id="slider"> <p>Change array size</p>
                    <input class="slider" id="arraybar" disabled={running ? "true" : null} type="range" min="20" max="300" value={this.state.array.length} onChange={this.sliderHandler} />
                </div>
                <div id="slider"> <p>Change animation speed</p>
                    <input class="slider" id="speedbar" disabled={running ? "true" : null} type="range" min="1" max="300" value={this.state.ANIM_SPEED} onChange={this.speedHandler} />
                </div>
                </div>
                <div id="buttons">
                    <button class="algobutton" id="newArray" disabled={running ? "true" : null} onClick={() => this.resetArray(document.getElementById("arraybar").value)} >New array</button>
                    <button class="algobutton" id="mergeSort" disabled={running ? "true" : null} onClick={() => this.mergeSort()} >Merge Sort</button>
                    <button class="algobutton" id="insertionSort" disabled={running ? "true" : null} onClick={() => this.insertionSort()} >Insertion Sort</button>
                    <button class="algobutton" id="bubbleSort" disabled={running ? "true" : null} onClick={() => this.bubbleSort()} >Bubble Sort</button>
                    <button class="algobutton" id="quickSort" disabled={running ? "true" : null} onClick={() => this.quickSort()} >Quick Sort</button>
                    <button class="algobutton" id="heapSort" disabled={running ? "true" : null} onClick={() => this.heapSort()} >Heap Sort</button>
                </div>
            </div>
        </div>
        )
    }

}

export default SortingVisualizer