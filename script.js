document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header')
    const h1 = document.getElementById('h1')
    const boxesContainer = document.getElementById('boxes')
    const colorHistory = []
    let gameInProgress = false
    let currentDifficulty = 'easy'
    let activeTab = 'antras'

    document.getElementById('antras').addEventListener('click', function() {
        startGame()
    })

    h1.addEventListener('click', function (event) {
        event.preventDefault()
    })

    function startGame() {
        setupGame(3)
    }

    function startHardGame() {
        setupGame(6)
    }

    function setupGame(numBoxes) {
        boxesContainer.innerHTML = ''

        const colors = []
        let correctColorIndex

        for (let i = 0; i < numBoxes; i++) {
            const randomColor = getRandomColor()
            colors.push(randomColor)

            const box = document.createElement('div')
            box.className = 'box'
            box.style.backgroundColor = randomColor

            boxesContainer.appendChild(box)

            box.addEventListener('click', function () {
                if (this.style.backgroundColor === colors[correctColorIndex]) {
                    setColors(colors[correctColorIndex])
                    colorHistory.push(colors[correctColorIndex])
                    console.log('Color History:', colorHistory)
                } else {
                    removeBoxes()
                }
            })
        }

        {
            // Add a line break after every 3 boxes for hard mode
            const lineBreak = document.createElement('br');
            boxesContainer.appendChild(lineBreak);
        }
        
        header.style.backgroundColor = '#4682b4'

        correctColorIndex = Math.floor(Math.random() * numBoxes)
        h1.textContent = `RGB(${extractRGB(colors[correctColorIndex])})`
    }

    function getRandomColor() {
        const red = Math.floor(Math.random() * 256)
        const green = Math.floor(Math.random() * 256)
        const blue = Math.floor(Math.random() * 256)
        return `rgb(${red}, ${green}, ${blue})`
    }

    function extractRGB(color) {
        const regex = /(\d+),\s*(\d+),\s*(\d+)/
        const match = color.match(regex)
        if (match) {
            return `${match[1]}, ${match[2]}, ${match[3]}`
        }
        return ''
    }

    function setColors(color) {
        header.style.backgroundColor = color
        const boxElements = document.getElementsByClassName('box')
        for (const box of boxElements) {
            box.style.backgroundColor = color
        }
        gameInProgress = false
    }

    function removeBoxes() {
        boxesContainer.innerHTML = ''
        gameInProgress = false
    }

    const newColorsTab = document.getElementById('pirmas')
    newColorsTab.addEventListener('click', function () {
        if (!gameInProgress) {
            if (currentDifficulty === 'easy') {
                startGame()
            } else {
                startHardGame()
            }
            gameInProgress = true
        }
    })

    const easyTab = document.getElementById('antras')
    easyTab.addEventListener('click', function () {
        currentDifficulty = 'easy'
        activeTab = 'antras'
        if (!gameInProgress) {
            startGame()
            gameInProgress = true
        }

        easyTab.classList.add('active')
        hardTab.classList.remove('active')
    })

    const hardTab = document.getElementById('trecias')
    hardTab.addEventListener('click', function () {
        currentDifficulty = 'hard'
        activeTab = 'trecias'
        if (!gameInProgress) {
            startHardGame()
            gameInProgress = true
        }


        hardTab.classList.add('active')
        easyTab.classList.remove('active')
    })
    function removeBoxes() {
        boxesContainer.innerHTML = ''
        gameInProgress = false

        const activeTabElement = document.getElementById(activeTab)
        activeTabElement.classList.add('active-tab')
    }
})