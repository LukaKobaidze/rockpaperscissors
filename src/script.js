const button = document.querySelector('.rules');
const popup = document.querySelector('.rules__popup');
const game = document.querySelector('.game');
const popupClose = ['.rules__popup--opacity', '.rules__popup-div--close'];
const answer = document.querySelector('.answer');
const myAnswer = document.querySelector('.answer--me');
const houseAnswer = document.querySelector('.answer--house');
const winnerEl = document.querySelector('.winner');
const winnerText = document.querySelector('.winner--text');
const btnPlayAgain = document.querySelector('.winner--btn');
const scoreEl = document.querySelector('.header__div__score-value');
let score = scoreEl.textContent;
let reset = 0;

const checkBtn = element => {
    if(element.classList.contains('game__btn--1')){
        return 'paper';
    }else if(element.classList.contains('game__btn--2')){
        return 'scissors';
    }else if(element.classList.contains('game__btn--3')){
        return 'rock';
    }
}

const winnerBackground = winner => {

}

const checkWinner = (player1, player2) => {
    let winner;

    if(player1 == 'rock'){
        if(player2 == 'paper'){
            winner = 'player2';
        }else if(player2 == 'scissors'){
            winner = 'player1';
        }else{
            winner = 'draw';
        }
    }else if(player1 == 'paper'){
        if(player2 == 'scissors'){
            winner = 'player2';
        }else if(player2 == 'rock'){
            winner = 'player1';
        }else{
            winner = 'draw';
        }
    }else if(player1 == 'scissors'){
        if(player2 == 'rock'){
            winner = 'player2';
        }else if(player2 == 'paper'){
            winner = 'player1';
        }else{
            winner = 'draw';
        }
    }
    return winner;
}

button.addEventListener('click', function () {
    console.log('clicked');
    popup.classList.remove('hidden');
});

popupClose.forEach(className => {
    document.querySelector(className).addEventListener('click', function () {
        popup.classList.add('hidden');
    })
});



game.addEventListener('click', function (e) {
    const clicked = e.target.closest('.game__btn');
    if(clicked){
        const randomNum = Math.trunc(Math.random() * 3) + 1; 
        const randomBtn = document.querySelector(`.game__btn--${randomNum}`)
        const myPick = checkBtn(clicked);
        const housePick = checkBtn(randomBtn);
        
        game.classList.add('hidden');
        answer.classList.remove('hidden');
        // clicked.style.transform = 'scale(1.2) translateY(5px)';
        myAnswer.insertAdjacentElement('afterbegin', clicked.cloneNode(true));
        setTimeout(function(){
            houseAnswer.insertAdjacentElement('afterbegin', randomBtn.cloneNode(true));
            setTimeout(function(){
                answer.classList.add('answer--win-width');
                if(checkWinner(myPick, housePick) === 'player1'){
                    winnerText.textContent = 'YOU WIN';
                    score++;
                    scoreEl.textContent = score + '';
                    myAnswer.classList.add('winner-animation');

                    
                }else if(checkWinner(myPick, housePick) === 'player2'){
                    winnerText.textContent = 'YOU LOSE';
                    score--;
                    scoreEl.textContent = score + '';
                    houseAnswer.classList.add('winner-animation');

                    if(score == 0){
                        winnerText.style.fontSize = '6rem';
                        winnerText.textContent = 'GAME OVER';
                        btnPlayAgain.textContent = 'RESET SCORE';
                    }
                    
                }else{
                    winnerText.textContent = 'DRAW';
                }
                winnerEl.classList.remove('hidden');
            }, 500);
            
        }, 500);
        
    }

});

btnPlayAgain.addEventListener('click', function(){
    answer.classList.add('hidden');
    game.classList.remove('hidden');
    winnerEl.classList.add('hidden');
    myAnswer.classList.remove('winner-animation')
    houseAnswer.classList.remove('winner-animation')
    answer.classList.remove('answer--win-width');
    myAnswer.textContent = '';
    houseAnswer.textContent = '';
    if(btnPlayAgain.textContent == 'RESET SCORE'){
        score = 3;
        scoreEl.textContent = score;
        btnPlayAgain.textContent = 'PLAY AGAIN';
        winnerText.style.fontSize = '7rem';
    }
    
    
})

