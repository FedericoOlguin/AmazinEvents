const busqueda = document.getElementById("busqueda")
const registro = document.getElementById("registro")

fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
    .then(promesa => promesa.json())
    .then(datos => {
        datosFijos = datos
        var fecha = datosFijos.fechaActual
        var proximosEvents = datosFijos.eventos.filter((evento) => { return evento.date > fecha })
        proximosEvents.forEach(evento => {
            document.getElementById("beforeContainerP").innerHTML += imprimirPantalla(evento)
        })
    })

function imprimirPantalla(evento) {

    return `<a class="linkCard" href="../detalle.html?id=${evento.id}" >
        <div class="card">
            <img src="${evento.image}" alt="feriaComida">
            <div class="cardBody">
                <h3 class="pCard">${evento.name}</h3>
                <p class="pCard"><strong>Date:</strong> ${evento.date} </p>
                <p class="pCard"><strong>Place:</strong> ${evento.place} </p>
                <p class="pCard"><strong>Description:</strong> ${evento.description}
                </p>
            </div>
        </div></a>`
}
busqueda.addEventListener("click", (e) => {
    window.location = "./search.html"

})
registro.addEventListener("click", () => {
    window.location = "../registro.html"
})