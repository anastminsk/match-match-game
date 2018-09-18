class Game {
    constructor(skirt, pictures) {        
        this.skirt = skirt;
        this.pictures = pictures;
        this.values = []; 
        this.cardIds = [];
        this.cardsFlipped = 0;
        this.url = null;
        this.width = null;
        this.height = null;
    }    

    choice() {
        switch (this.skirt) {
            case 'one':
                this.url = 'url(../img/bells-logo.png) 50% 50% no-repeat';
                break;
            case 'two':
                this.url = 'url(../img/tree-logo.png) 50% 50% no-repeat';
                break;
            case 'three':
                this.url = 'url(../img/santa-logo.png) 50% 50% no-repeat';
                break;
        }

        switch (this.pictures.length) {
            case 8:
                this.width = '260px';
                this.height = '260px';
                document.querySelector('.board').style.width = '1120px';
                break;
            case 18:
                this.width = '200px';
                this.height = '200px';
                document.querySelector('.board').style.width = '1320px';
                break;
            case 32:
                this.width = '120px';
                this.height = '120px';
                document.querySelector('.board').style.width = '1120px';
                break;
        }
    }


    newBoard() {
        this.cardsFlipped = 0;
        let output = '';
        this.pictures.shuffle();
        for (let i = 0; i < this.pictures.length; i++) {
            output += '<div id="card'+i+'"></div>';
        }

        document.querySelector('.board').innerHTML = output;

        let elements = document.querySelectorAll('.board > div');
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.background = this.url;
            elements[i].style.width = this.width;
            elements[i].style.height = this.height;
            elements[i].onclick = () => {
                this.flipCard(elements[i], this.pictures[i]["name"], this.pictures[i]["url"]);
            };
        }
    }
    

    flipCard(card, val, bg) {
        if (card.innerHTML == "" && this.values.length < 2) {
            card.style.background = bg;
            card.innerHTML = val;

            if (this.values.length == 0) {
                this.values.push(val);
                this.cardIds.push(card.id);

            } else if (this.values.length == 1) {
                this.values.push(val);
                this.cardIds.push(card.id);

                if (this.values[0] == this.values[1]) {
                    let c1 = document.getElementById(this.cardIds[0]);
                    let c2 = document.getElementById(this.cardIds[1]);
                    c1.style.opacity = '0';
                    c1.style.border = '0';
                    c1.style.cursor = 'default';
                    c1.innerHTML = "";
                    c1.onclick = "return false";
                    c2.style.opacity = '0';
                    c2.style.border = '0';
                    c2.style.cursor = 'default';
                    c2.innerHTML = "";
                    c2.onclick = "return false";
                    this.cardsFlipped += 2;
                    this.values = [];
                    this.cardIds = [];

                    if (this.cardsFlipped == this.pictures.length) {
                        let question = confirm("Congratulations! You won the game! Play again?");
                        if (question) {
                            document.querySelector('.board').innerHTML = "";
                            document.querySelector('.timer').innerHTML = "00:00:00";
                            this.newBoard();
                        } else stopTimer();
                    }
                } else {
                    let flipBack = () => {
                        let c1 = document.getElementById(this.cardIds[0]);
                        let c2 = document.getElementById(this.cardIds[1]);
                        c1.style.background = this.url;
                        c1.innerHTML = "";
                        c2.style.background = this.url;
                        c2.innerHTML = "";
                        this.values = [];
                        this.cardIds = [];
                    }                         
                    setTimeout(flipBack, 700);
                }
            }
        }
    }
}