let timerId;

function startTimer() {
    let timer = document.querySelector('.timer');
    let time = timer.innerHTML;
    let arr = time.split(":");
    let h = Number(arr[0]);
    let m = Number(arr[1]);
    let s = Number(arr[2]);

    s++;
    
    if (s == 60) {
      s = 0;
      m++;
      if (m == 60) {
        m = 0;
        h++;
      }
      if (h == 24) {
        h = 0;
      }
    }

    if (s < 10) {
      s = "0" + s;
    }

    if (m < 10) {
      m = "0" + m;
    }

    if (h < 10) {
      h = "0" + h;
    }

    document.querySelector('.timer').innerHTML = h+":"+m+":"+s;
    timerId = setTimeout(startTimer, 1000);
}

function stopTimer() {
    clearInterval(timerId);
}