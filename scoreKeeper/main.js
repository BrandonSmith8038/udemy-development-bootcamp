const p1Score = document.querySelector('#p1Score')
const p2Score = document.querySelector('#p2Score')

const playingTo = document.querySelector('#playingTo')

const playingToInput = document.querySelector('#playingToInput')

const p1Button = document.querySelector('#p1Button')
const p2Button = document.querySelector('#p2Button')
const resetButton = document.querySelector('#reset')

let p2ScoreValue = 0
let p1ScoreValue = 0

let playToValue = 7;





const startGame = () => {
    setPlayingTo();
    addPlayer1Score()
    addPlayer2Score()
    reset()
}



const setPlayingTo = () => {
    
    playingToInput.value = playToValue
    
    playingToInput.addEventListener('input', (e) => {
        playingTo.textContent = e.target.value
        playToValue = e.target.value
    })
}

const addPlayer1Score = () => {
    
    p1Score.textContent = p1ScoreValue
    
    p1Button.addEventListener('click', () => {
        p1ScoreValue++
        p1Score.textContent = p1ScoreValue
        checkForWinner()
    })
    
}

const addPlayer2Score = () => {
    
    p2Score.textContent = p2ScoreValue
    
    p2Button.addEventListener('click', () => {
        p2ScoreValue++
        p2Score.textContent = p2ScoreValue
        checkForWinner()
    })
    
}

const reset = () => {
    
    resetButton.addEventListener('click', () => {
        p1ScoreValue = 0
        p2ScoreValue = 0
        p2Score.textContent = p2ScoreValue
        p1Score.textContent = p1ScoreValue
        p1Button.disabled=false
        p2Button.disabled=false
        p1Score.classList = ''
        p2Score.classList = ''
    })
}


const checkForWinner = () => {
    if(p1ScoreValue === Number(playToValue)){
        p1Score.classList = 'winner'
        p1Button.disabled=true
        p2Button.disabled=true
    } else if (p2ScoreValue === Number(playToValue)) {
        p1Button.disabled=true
        p2Button.disabled=true
        p2Score.classList = 'winner'
    }
}

startGame();
