const submt = document.getElementById('mainButton')
const fromUnit = document.getElementById('fromUnit')
const toUnit = document.getElementById('toUnit')
const temperature = document.getElementById('temperature')
const res = document.getElementById('result')


function parseInput()
{
    const t = temperature.value
    if (isNaN(parseFloat(t)) || !isFinite(t))
        throw Error('Enter a valid value!')

    return parseFloat(t)
}

function convertFunction(from, to, value)
{
    if (from == "Celseus" && to == "Fahrenheit")
        return (value * 9/5) + 32
    else if (from == "Fahrenheit" && to == "Celseus")
        return (value - 32) * 5/9
    else if (from == "Celseus" && to == "Kelvin")
        return value + 273.15
    else if (from == "Kelvin" && to == "Celseus")
        return value - 273.15
    else if (from == "Fahrenheit" && to == "Kelvin")
        return (value - 32) * 5/9 + 273.15
    else if (from == "Kelvin" && to == "Fahrenheit")
        return (value - 273.15) * 9/5 + 32;
    return value

}

submt.addEventListener('click', () =>
{
    let to = "";
    let result = 0;

    try
    {

        const tempValue = parseInput()
        temperature.value = ''

        switch (fromUnit.value) {
            case "Celseus":
                to = "Celseus"
                break;
            case "Fahrenheit":
                to = "Fahrenheit";
                break;
            case "Kelvin":
                to = "Kelvin";
                break;
            default:
                break;
        }
        switch (toUnit.value) {
            case "Celseus":
                result = convertFunction("Celseus", to, tempValue)
                break;
            case "Fahrenheit":
                result = convertFunction("Fahrenheit", to, tempValue)
                break;
            case "Kelvin":
                result = convertFunction("Kelvin", to, tempValue)
                break;
            default:
                break;
        }
        res.textContent = result.toString()
    }
            catch (e) {
            console.log(e)
            document.getElementById('cardP').textContent = e.message

            const card = document.querySelector('.card')
            card.style.display = 'flex'
            card.style.transform = 'translateX(250px)' 

            setTimeout(() => {
                card.style.transform = 'translateX(0)'
            }, 10)

            setTimeout(() => {
                card.style.transform = 'translateX(250px)'
                setTimeout(() => {
                    card.style.display = 'none'
                }, 500)
            }, 2000)

            temperature.value = ''
        }
})


function enableButtonIfReady() {
    if (temperature.value.trim() && toUnit.value && fromUnit.value)
    {
        submt.disabled = false;
    } else {
        submt.disabled = true;
    }
}

temperature.addEventListener('input', enableButtonIfReady);
fromUnit.addEventListener('change', enableButtonIfReady);
toUnit.addEventListener('change', enableButtonIfReady);
