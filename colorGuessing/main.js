const colors = [
    "rgb(255, 0, 0)",
    "rgb(255, 255, 0)",
    "rgb(0, 255, 0)",
    "rgb(0, 255, 255)",
    "rgb(0, 0, 255)",
    "rgb(255, 0, 255)"
    ]
    
    
    const pickColor = () => {
        const random = Math.floor(Math.random() * colors.length)
        
        return colors[random]
    }
    
    
    const changeColor = color => {
        for(let i = 0;i < squares.length;i++){
            squares[i].style.backgroundColor = color;;
        } 
    }
    
    
    
    const squares = document.querySelectorAll('.square')
    const colorDisplay = document.getElementById('colorDisplay')
    const message = document.querySelector('#message')
    
    const pickedColor = pickColor()
    
    colorDisplay.textContent = pickedColor;
    
    for(let i=0;i < squares.length; i++) {
        //Add inital colors to squares
        squares[i].style.backgroundColor = colors[i]
        
        //add click listeners to squares
        squares[i].addEventListener('click', function() {
            //Grab color of clicked square
            let clickedColor = this.style.backgroundColor
            //Compare to picked color
            if(clickedColor === pickedColor){
                message.textContent = 'Correct'
                changeColor(clickedColor)
            } else {
                this.style.backgroundColor = '#232323'
                message.textContent = 'Try Again'
            }
        })
    }
    
    
    
    