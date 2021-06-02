console.log('Client side javascript activate!')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msgOne')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msgOne.textContent = data.error
            } else {
                msgOne.textContent = data.forecastReport
            }

        })
    })
})