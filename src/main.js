let estherLock = false
let eliasLock = false

function unlockElias() {
    eliasLock = false
}

function unlockEsther() {
    estherLock = false
}

document.addEventListener('keyup', (event) => {
    if (!eliasLock && (event.code === 'Enter' || event.code === 'NumpadEnter')) {
        eliasLock = true;
        setTimeout(unlockElias, 30000)
        eliasLocks.locks[eliasLocks.counter] = 1
        eliasLocks.counter++
        sucessChime.play()
        updateColors()
    }

    if (!estherLock && event.code === 'Space') {
        estherLock = true;
        setTimeout(unlockEsther, 30000)
        estherLocks.locks[estherLocks.counter] = 1
        estherLocks.counter++
        sucessChime.play()
        updateColors()
    }

}, false);

// audio
const sucessChime = new Audio('success.wav')
const defeatChime = new Audio('defeat.wav')

const EstherWakeUp = document.getElementById("EstherWakeUp")
const EstherBreakfast = document.getElementById("EstherBreakfast")
const EstherTeeth = document.getElementById("EstherTeeth")
const EstherDressUp = document.getElementById("EstherDressUp")

const EliasWakeUp = document.getElementById("EliasWakeUp")
const EliasBreakfast = document.getElementById("EliasBreakfast")
const EliasTeeth = document.getElementById("EliasTeeth")
const EliasDressUp = document.getElementById("EliasDressUp")

let now = new Date()

let hour = 7

let deadlines = {
    wakeUp: new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, 5),
    breakfast: new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, 28),
    teeth: new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, 33),
    dressup: new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, 45)
}

function millisecondsToString(m) {
    if (m < 0) {
        return '00:00:00'
    }

    let hours, minutes, seconds

    hours = (Math.floor(m / 3600000) + "").padStart(2, '0')
    m = m % 3600000

    minutes = (Math.floor(m / 60000) + "").padStart(2, '0')
    m = m % 60000

    seconds = (Math.floor(m / 1000) + "").padStart(2, '0')

    return `${hours}:${minutes}:${seconds}`
}

let eliasLocks = {
    counter: 0,
    locks: [0, 0, 0, 0]
}

let estherLocks = {
    counter: 0,
    locks: [0, 0, 0, 0]
}

function updateColors() {
    if (estherLocks.counter > 0 && estherLocks.counter < 5) {
        let elements = document.getElementsByClassName(`es${estherLocks.counter}`)

        for (let e of elements) {
            e.setAttribute('style', 'color:#4bec0c')
        }
    }

    if (eliasLocks.counter > 0 && eliasLocks.counter < 5) {
        let elements = document.getElementsByClassName(`el${eliasLocks.counter}`)

        for (let e of elements) {
            e.setAttribute('style', 'color:#4bec0c')
        }
    }

    for (let i=0; i<4; i++) {
        if (estherLocks.locks[i] === -1) {
            let elements = document.getElementsByClassName(`es${i+1}`)
            for (let e of elements) {
                e.setAttribute('style', 'color:#bf2121')
            }
        }
    }

    for (let i=0; i<4; i++) {
        if (eliasLocks.locks[i] === -1) {
            let elements = document.getElementsByClassName(`el${i+1}`)
            for (let e of elements) {
                e.setAttribute('style', 'color:#bf2121')
            }
        }
    }
}

window.setInterval(loop, 40);

function loop() {
    let now = new Date()

    if (deadlines.wakeUp - now.getTime() < 0) {
        if (estherLocks.counter < 1) {
            estherLocks.counter++;
            estherLocks.locks[0] = -1
            defeatChime.play()
        }
        if (eliasLocks.counter < 1) {
            eliasLocks.counter++;
            eliasLocks.locks[0] = -1
            defeatChime.play()
        }
        updateColors()
    }

    if (deadlines.breakfast - now.getTime() < 0) {
        if (estherLocks.counter < 2) {
            estherLocks.counter++;
            estherLocks.locks[1] = -1
            defeatChime.play()
        }
        if (eliasLocks.counter < 2) {
            eliasLocks.counter++;
            eliasLocks.locks[1] = -1
            defeatChime.play()
        }
        updateColors()
    }

    if (deadlines.teeth - now.getTime() < 0) {
        if (estherLocks.counter < 3) {
            estherLocks.counter++;
            estherLocks.locks[2] = -1
            defeatChime.play()
        }
        if (eliasLocks.counter < 3) {
            eliasLocks.counter++;
            eliasLocks.locks[2] = -1
            defeatChime.play()
        }
        updateColors()
    }

    if (deadlines.dressup - now.getTime() < 0) {
        if (estherLocks.counter < 4) {
            estherLocks.counter++;
            estherLocks.locks[3] = -1
            defeatChime.play()
        }
        if (eliasLocks.counter < 4) {
            eliasLocks.counter++;
            eliasLocks.locks[3] = -1
            defeatChime.play()
        }
        updateColors()
    }

    if (estherLocks.counter < 1 && estherLocks.locks[0] == 0) EstherWakeUp.innerText = millisecondsToString(deadlines.wakeUp - now.getTime())
    if (estherLocks.counter < 2 && estherLocks.locks[1] == 0) EstherBreakfast.innerText = millisecondsToString(deadlines.breakfast - now.getTime())
    if (estherLocks.counter < 3 && estherLocks.locks[2] == 0) EstherTeeth.innerText = millisecondsToString(deadlines.teeth - now.getTime())
    if (estherLocks.counter < 4 && estherLocks.locks[3] == 0) EstherDressUp.innerText = millisecondsToString(deadlines.dressup - now.getTime())

    if (eliasLocks.counter < 1 && eliasLocks.locks[0] == 0) EliasWakeUp.innerText = millisecondsToString(deadlines.wakeUp - now.getTime())
    if (eliasLocks.counter < 2 && eliasLocks.locks[1] == 0) EliasBreakfast.innerText = millisecondsToString(deadlines.breakfast - now.getTime())
    if (eliasLocks.counter < 3 && eliasLocks.locks[2] == 0) EliasTeeth.innerText = millisecondsToString(deadlines.teeth - now.getTime())
    if (eliasLocks.counter < 4 && eliasLocks.locks[3] == 0) EliasDressUp.innerText = millisecondsToString(deadlines.dressup - now.getTime())
}
