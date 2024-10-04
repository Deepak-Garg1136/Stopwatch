let list = document.getElementById("list")
let left_button = document.getElementById("left_button")
let right_button = document.getElementById("right_button")
let hour = document.getElementById("hour")
let minute = document.getElementById("minute")
let second = document.getElementById("second")
let millisecond = document.getElementById("millisecond")
let arrow_button = document.getElementById("arrow_button")
let arrow_button_up = document.getElementById("arrow_button_up")
let lap = 1
let id = 0
let ms = 0
let sec = 0
let min = 0
let hou = 0


right_button.addEventListener("click", function () {
    if (right_button.innerText === "Start") {
        right_button.innerText = "Stop";
        left_button.innerText = "Lap";
        id = setInterval(function () {
            // Update milliseconds
            if (ms < 10) {
                millisecond.innerText = "0" + ms;
            } else {
                millisecond.innerText = ms;
            }
            ms++;

            // Update seconds when milliseconds reach 100 (1000ms / 10ms interval = 100)
            if (ms >= 100) {
                ms = 0;
                sec++;
                if (sec >= 60) {
                    sec = 0;
                    min++;
                    if (min >= 60) {
                        min = 0;
                        hou++;
                        if (hou < 10) {
                            hour.innerText = "0" + hou;
                        } else {
                            hour.innerText = hou;
                        }
                    }
                    if (min < 10) {
                        minute.innerText = "0" + min;
                    } else {
                        minute.innerText = min;
                    }
                }
                if (sec < 10) {
                    second.innerText = "0" + sec;
                } else {
                    second.innerText = sec;
                }
            }
        }, 10);
    } else {
        right_button.innerText = "Start";
        left_button.innerText = "Reset";
        clearInterval(id);
    }
});

left_button.addEventListener("click", function () {
    if (left_button.innerText === "Lap") {
        let text = hour.innerText + ":" + minute.innerText + ":" + second.innerText + ":" + millisecond.innerText
        if (text != "00:00:00:00") {
            let li = document.createElement("li")
            let h3 = document.createElement("h3")
            let span = document.createElement("span")
            h3.innerText = "Lap" + " " + lap++
            span.innerText = text
            li.appendChild(h3)
            li.appendChild(span)
            list.appendChild(li)
        } else {
            alert("Start the Stopwatch first")
        }
    } else {
        ms = 0
        sec = 0
        min = 0
        hou = 0
        lap = 1
        left_button.innerText = "Lap"
        list.innerHTML = ''
        hour.innerText = "00"
        minute.innerText = "00"
        second.innerText = "00"
        millisecond.innerText = "00"
    }
    showDownArrow()
    showUpArrow()
})

function showDownArrow() {
    if (list.offsetHeight > 208) {
        arrow_button.style.display = 'block'
        arrow_button.addEventListener("click", function () {
            list.scrollBy({
                top: 70,
                behavior: 'smooth'
            })
        })
    } else {
        arrow_button.style.display = 'none'
    }
}

list.addEventListener("scroll", function () {
    if (list.scrollTop + list.clientHeight >= list.scrollHeight - 1) {
        arrow_button.style.display = 'none'
    } else {
        arrow_button.style.display = 'block'
    }

    if (list.scrollTop === 0) {
        arrow_button_up.style.display = 'none';
    } else {
        arrow_button_up.style.display = 'block';
    }
})

function showUpArrow() {
    if (list.offsetHeight > 208) {
        arrow_button_up.addEventListener("click", function () {
            list.scrollBy({
                top: -67,
                behavior: 'smooth'
            })
        })
    }
}
