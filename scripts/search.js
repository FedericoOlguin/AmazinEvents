
const busqueda = document.getElementById("busqueda")
const beforeContainer = document.getElementById("beforeContainer")
const resBusqueda = document.getElementById("resBusqueda")
const selectInp = document.getElementById("selectInp")
let datosFijos = []
let textSerch = ""
let valueSelect = ""
let valueLugar = []


fetch("./AmazingEvents.json")
    .then(promesa => promesa.json())
    .then(datos => {
        datosFijos.push(...datos.eventos)
        imprimirPantalla(datosFijos)
    })


selectInp.addEventListener("change", getValueSelect)
busqueda.addEventListener("input", getTextSearch)


function getValueSelect() {
    var valor = event.target.value
    valueSelect = valor
    let filtrado = filtrar(valor, textSerch)
    imprimirPantalla(filtrado)
}


function getTextSearch() {
    let valor = event.target.value
    textSerch = valor
    let filtrado = []
    // let filtrado = filtrar(valueSelect, valor)
    if (textSerch == undefined) {
        switch (valueSelect) {
            case "menor":
                filtrado.push(...datosFijos.filter(even => even.capacity < 50000))
                console.log(filtrado)
                break;
            case "mayor":
                filtrado.push(...datosFijos.filter(even => even.capacity > 50000))
                break;
            default:
                filtrado.push(...datosFijos)
        }
    } else {
        switch (valueSelect) {
            case "menor":
                filtrado.push(...datosFijos.filter(even => even.capacity < 50000 && even.name.toLowerCase().includes(valor.toLowerCase())))
                break;
            case "mayor":
                filtrado.push(...datosFijos.filter(even => even.capacity > 50000 && even.name.toLowerCase().includes(valor.toLowerCase())))
                break;
            default:
                filtrado.push(...datosFijos.filter(even => even.name.toLowerCase().includes(valor.toLowerCase())))
        }
    }
    imprimirPantalla(filtrado)
}


function imprimirPantalla(arrayEven) {
    beforeContainer.innerHTML = ""
    let imprimir = []
    if (arrayEven) {
        imprimir = []
        imprimir.push(...arrayEven)
    } else {
        imprimir = []
        imprimir.push(...datosFijos)
    }
    imprimir.forEach(evento => {
        beforeContainer.innerHTML +=
            `<a class="linkCard" href="" id=${evento.id}>
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
    })
}


function filtrar(selectVlaue, inputVlaue) {
    let filtrado = []
    if (inputVlaue != undefined) {
        switch (selectVlaue) {
            case "menor":
                filtrado.push(...datosFijos.filter(even => even.capacity < 50000))
                break;
            case "mayor":
                filtrado.push(...datosFijos.filter(even => even.capacity > 50000))
                break;
            default:
                filtrado.push(...datosFijos)
        }
    } else {
        switch (selectVlaue) {
            case "menor":
                filtrado.push(...datosFijos.filter(even => even.capacity < 50000 && even.name.toLowerCase().includes(inputVlaue.toLowerCase())))
                break;
            case "mayor":
                filtrado.push(...datosFijos.filter(even => even.capacity > 50000 && even.name.toLowerCase().includes(inputVlaue.toLowerCase())))
                break;
            default:
                filtrado.push(...datosFijos.filter(even => even.name.toLowerCase().includes(inputVlaue.toLowerCase())))
        }
    }
    return filtrado
}





