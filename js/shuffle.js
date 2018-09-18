Array.prototype.shuffle = function() {
    let i = this.length, randInd, temp;
    while (i > 0) {
        randInd = Math.floor(Math.random() * i);
        temp = this[randInd];
        this[randInd] = this[i - 1];
        this[i - 1] = temp;
        i--;
    }
}