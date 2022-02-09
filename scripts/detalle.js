const beforeContainer = document.getElementById("beforeContainer")
const registro = document.getElementById("registro")

let datosFijos = []

let espacio = "__"



async function getDatos() {
    await fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
        .then(response => response.json())
        .then(datos => {
            datosFijos.push(...datos.eventos)
        })
    let id = location.search.split("id=").filter(Number)
    let idSelected = Number = (id[0])
    let evenImprimir = datosFijos.find(function (evento) {
        return evento.id == idSelected
    })
    // console.log(evenImprimir)
    beforeContainer.innerHTML =
        (`<div class=" cardDetalle">
            <img src="${evenImprimir.image}" class="imgDetalleCard" alt="Ximagen">
            <div class="cardDetalleBody">
                <h3 class="tcardDetalle">${evenImprimir.name}</h3>
                    <div class="divCardDetalle">
                        <span class="spanCardD">Date:<p class="pCardD">${evenImprimir.date}</p>
                        </span>
                        <span class="spanCardD">Place:<p class="pCardD"> ${evenImprimir.place}</p></span>
                    </div>
                    <div class="divCardDetalle">
                        <span class="spanCardD" >Category:<p class="pCardD">${evenImprimir.category} </p></span>
                        <span class="spanCardD">Price:<p class="pCardD">$${evenImprimir.price} </p></span>
                    </div>
                    <span class="spanCardD description" >Description:<p class="pCardD"> ${evenImprimir.description}</p></span>
            </div>
        </div>`)
}

getDatos()



registro.addEventListener("click", () => {
    window.location = "../registro.html"
})