let arrayEventos = []
var valorSelect = ""



fetch("../AmazingEvents.json")
    .then(response => response.json())
    .then(datos => {
        arrayEventos.push(...datos.eventos)

        printPantalla(arrayEventos)
    })

document.querySelector("#busqueda").addEventListener("keyup", getInput)

function getInput() {
    var valor = event.target.value
    valorSelect = valor
    let filtrado = []
    filtrado.push(...arrayEventos.filter(evento => evento.name.toLowerCase().includes(valor.toLowerCase())))
    printPantalla(filtrado)
}


function printPantalla(a) {
    var imprimir = []
    document.querySelector("#beforeContainer").innerHTML = ""
    if (a) {
        imprimir = []
        imprimir.push(...a)
    } else {
        imprimir = []
        imprimir.push(...arrayEventos)
    }
    imprimir.forEach(evento => {
        document.querySelector("#beforeContainer").innerHTML +=
            `<a class="linkCard" href="../detalle.html" id=${evento.id}>
        <div class="card">
           <img src="${evento.image}" alt="feriaComida">
           <div class="cardBody">
               <h3 class="pCard">${evento.name}</h3>
               <p class="pCard"><strong>Fecha:</strong> ${evento.date} </p>
               <p class="pCard"><strong>Lugar:</strong> ${evento.place} </p>
               <p class="pCard"><strong>Descipcion:</strong> ${evento.description}
               </p>
           </div>
       </div></a>`
    }
    )
}


