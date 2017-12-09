    let numSquares = 6;
    let colors = []
    let pickedColor
    const squares = document.querySelectorAll('.square')
    const colorDisplay = document.getElementById('colorDisplay')
    const message = document.querySelector('#message')
    const h1 = document.querySelector('h1')
    const resetButton = document.querySelector('#reset')
    const modeButtons = document.querySelectorAll(".mode")
    
   
   
   const init = () => {
        
        setUpModeButtons();
        setUpSquares()
        
    }
    
    function setUpModeButtons(){
        for(var i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener('click', function() {
            modeButtons[0].classList.remove('selected')
            modeButtons[1].classList.remove('selected')
            this.classList.add('selected')
            this.textContent === 'Easy' ? numSquares = 3 : numSquares = 6
            reset()
        })
        }
    }
    
    function setUpSquares(){
        for (let i = 0; i < squares.length; i++) {
        //Add inital colors to squares

        //add click listeners to squares
        squares[i].addEventListener('click', function() {
            //Grab color of clicked square
            let clickedColor = this.style.backgroundColor
            //Compare to picked color
            if (clickedColor === pickedColor) {
                message.textContent = 'Correct'
                changeColor(clickedColor)
                h1.style.backgroundColor = clickedColor
                resetButton.textContent = 'Play Again?'
            }
            else {
                this.style.backgroundColor = '#232323'
                message.textContent = 'Try Again'
            }
        })
        }
        reset()
    }
    
    const reset = () => {
        //Generate all new colors
       colors = generateRandomColors(numSquares)
       //Pick a new random color from array
       pickedColor = pickColor()
       //Change colorDisplay to match picked color
       colorDisplay.textContent = pickedColor
       //Change colors of squares
       for(let i=0;i < squares.length; i++){
           if(colors[i]) {
               squares[i].style.display = 'block'
               squares[i].style.background = colors[i]
           } else {
                squares[i].style.display = 'none'   
           }
       }
       h1.style.backgroundColor = 'steelblue'
       resetButton.textContent = 'New Colors'
       message.textContent = ''
    }

    

    const changeColor = color => {
        for (let i = 0; i < squares.length; i++) {
            squares[i].style.backgroundColor = color;;
        }
    }

    const randomColor = () => {
        let r = Math.floor(Math.random() * 256)
        let b = Math.floor(Math.random() * 256)
        let g = Math.floor(Math.random() * 256)


        return `rgb(${r}, ${g}, ${b})`
    }

    const generateRandomColors = numOfColors => {
        let arr = []

        for (let i = 0; i < numOfColors; i++) {
            arr.push(randomColor())
        }

        return arr
    }
    
    
    const pickColor = () => {
        const random = Math.floor(Math.random() * colors.length)

        return colors[random]
    }
    
    resetButton.addEventListener('click', function() {
        reset()
    })

    init()