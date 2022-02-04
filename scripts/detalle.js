const beforeContainer = document.getElementById("beforeContainer")
let datosFijos = []



async function getDatos() {
    await fetch("../AmazingEvents.json")
        .then(response => response.json())
        .then(datos => {
            datosFijos.push(...datos.eventos)
        })
    let id = location.search.split("id=").filter(Number)
    let idSelected = Number = (id[0])
    let evenImprimir = datosFijos.find(function (evento) {
        return evento.id == idSelected
    })
    console.log(evenImprimir)
    beforeContainer.innerHTML =
        (`<div class=" cardDetalle">
    <img src="${evenImprimir.image}" class="imgDetalleCard" alt="Ximagen">
<div class="cardDetalleBody">
    <h3 class="pCardD">${evenImprimir.name}</h3>
    <p class="pCardD"><strong>Fecha:</strong>${evenImprimir.date}  </p>
    <p class="pCardD"><strong>Lugar:</strong>${evenImprimir.place} </p>
    <p class="pCardD"><strong>Descipcion:</strong> ${evenImprimir.description}</p>
</div>
</div>`)
}

getDatos()