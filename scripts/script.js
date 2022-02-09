const beforeContainer = document.getElementById("beforeContainer")
const afterContainer = document.getElementById("afterContainer")
const btnBefore = document.getElementById("btnBefore")
const btnAfter = document.getElementById("btnAfter")
const main = document.getElementById("main")
const busqueda = document.getElementById("busqueda")
const registro = document.getElementById("registro")
var arrayFijo = []
var fechaActual = ""


busqueda.addEventListener("click", (e) => {
    window.location = "../search.html"

})

btnBefore.addEventListener("click", () => {
    window.location = "../proximos.html"
})


btnAfter.addEventListener("click", () => {
    window.location = "../pasados.html"
})

registro.addEventListener("click", () => {
    window.location = "../registro.html"
})


getDatos()
var datoFijo = ""
async function getDatos() {
    await fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
        .then(promesa => promesa.json())
        .then(dato => {
            datoFijo = dato
        })
    imprimirCardIndex(datoFijo)
}

function imprimirCardIndex(cardInfo) {
    let arrayBefore = []
    let arrayAfter = []
    cardInfo.eventos.forEach(evento => {
        if (evento.date >= cardInfo.fechaActual) {
            arrayBefore = cardInfo.eventos.filter(even => even.date >= cardInfo.fechaActual)
        } else if (evento.date < cardInfo.fechaActual) {
            arrayAfter = cardInfo.eventos.filter(even => even.date <= cardInfo.fechaActual)
        }
    })
    arrayBefore.splice(2, Infinity)
    arrayAfter.splice(2, Infinity)
    imprimirCard(arrayBefore, beforeContainer)
    imprimirCard(arrayAfter, afterContainer)
}

function imprimirCard(cardInfo, elementHtml) {

    cardInfo.forEach(evento => {
        elementHtml.innerHTML +=
            `<a class="linkCard" href="../detalle.html?id=${evento.id}">
            <div class="card">
            <h3 class="pCard pru" >${evento.name}</h3>
        
                <img src="${evento.image}" alt="feriaComida">
                <div class="cardBody">
                    <p class="pCard"><strong>Date:</strong> ${evento.date} </p>
                    <p class="pCard"><strong>Place:</strong> ${evento.place} </p>
                    <p class="pCard"><strong>Description:</strong> ${evento.description}
                    </p>
                </div>
            </div></a>`
    })
}