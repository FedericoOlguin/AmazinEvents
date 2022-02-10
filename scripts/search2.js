
const busqueda = document.getElementById("busqueda")
const beforeContainer = document.getElementById("beforeContainer")
const resBusqueda = document.getElementById("resBusqueda")
const selectInp = document.getElementById("selectInp")

const registro = document.getElementById("registro")
const checkboxContainer = document.getElementById("checkboxContainer")

let datosFijos = []
let textSerch = ""
let valueSelect = ""
let valueCheckbox = []
let categoryA = []

getData()
async function getData() {
    await fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
        .then(promesa => promesa.json())
        .then(datos => {
            datosFijos.push(...datos.eventos)

            let prueba = [...datosFijos.filter(eve => { return eve.assistance != undefined })]
            categoryA = prueba.map(even =>
                even.category
            )
            categoryA = [...new Set(categoryA)]
            imprimirPantalla(datosFijos)
            imprimirCheck()
            getValueChecbox()
            selectInp.addEventListener("change", getValueSelect)
            busqueda.addEventListener("input", getTextSearch)
            // console.table(categoryA)

        })

}




function imprimirCheck() {
    categoryA.forEach(categ => {
        checkboxContainer.innerHTML += (`<label class="labelCheck">${categ} <input   class="checBox" value="${categ}" type="checkbox"></label`)
    })


}
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

    if (valor.length > 0) {
        resBusqueda.innerHTML = valor
    } else {
        resBusqueda.innerHTML = " todos los eventos"
    }


    if (valueCheckbox.length > 0) {
        valueCheckbox.map(lugar => {
            if (textSerch == undefined) {
                switch (valueSelect) {
                    case "menor":
                        filtrado.push(...datosFijos.filter(even => even.category.toLowerCase().includes(lugar.toLowerCase()) && even.capacity < 50000))
                        break;
                    case "mayor":
                        filtrado.push(...datosFijos.filter(even => even.category.toLowerCase().includes(lugar.toLowerCase()) && even.capacity > 50000))
                        break;
                    default:
                        filtrado.push(...datosFijos.filter(even => even.category.toLowerCase().includes(lugar.toLowerCase())))
                }
            } else {
                switch (valueSelect) {
                    case "menor":
                        filtrado.push(...datosFijos.filter(even => even.category.toLowerCase().includes(lugar.toLowerCase()) && even.capacity < 50000 && even.name.toLowerCase().includes(textSerch.toLowerCase())))
                        break;
                    case "mayor":
                        filtrado.push(...datosFijos.filter(even => even.category.toLowerCase().includes(lugar.toLowerCase()) && even.capacity > 50000 && even.name.toLowerCase().includes(textSerch.toLowerCase())))
                        break;
                    default:
                        filtrado.push(...datosFijos.filter(even => even.category.toLowerCase().includes(lugar.toLowerCase()) && even.name.toLowerCase().includes(textSerch.toLowerCase())))
                }
            }
        })
    } else if (textSerch == undefined && valueCheckbox.length == 0) {
        filtrado.push(...datosFijos)
    } else {
        switch (valueSelect) {
            case "menor":
                filtrado.push(...datosFijos.filter(even => even.capacity < 50000 && even.name.toLowerCase().includes(textSerch.toLowerCase())))
                break;
            case "mayor":
                filtrado.push(...datosFijos.filter(even => even.capacity > 50000 && even.name.toLowerCase().includes(textSerch.toLowerCase())))
                break;
            default:
                filtrado.push(...datosFijos.filter(even => even.name.toLowerCase().includes(textSerch.toLowerCase())))
        }
    }


    imprimirPantalla(filtrado)
}


function getValueChecbox() {
    const inpChecBox = document.querySelectorAll(".checBox")

    inpChecBox.forEach(element => {
        element.addEventListener("click", (e) => {
            if (element.checked == true) {
                valueCheckbox.push(e.target.value)
                console.log(valueCheckbox)
            } else {
                valueCheckbox = valueCheckbox.filter(elementV => elementV != element.value)
                console.log(valueCheckbox)
            }

            let filtrado = []

            if (valueCheckbox.length > 0) {
                valueCheckbox.map(lugar => {
                    if (textSerch == undefined) {
                        switch (valueSelect) {
                            case "menor":
                                filtrado.push(...datosFijos.filter(even => even.category.toLowerCase().includes(lugar.toLowerCase()) && even.capacity < 50000))
                                console.log(filtrado)
                                break;
                            case "mayor":
                                filtrado.push(...datosFijos.filter(even => even.category.toLowerCase().includes(lugar.toLowerCase()) && even.capacity > 50000))
                                break;
                            default:

                                filtrado.push(...datosFijos.filter(even => even.category.toLowerCase().includes(lugar.toLowerCase())))
                        }
                    } else {
                        switch (valueSelect) {
                            case "menor":
                                filtrado.push(...datosFijos.filter(even => even.category.toLowerCase().includes(lugar.toLowerCase()) && even.capacity < 50000 && even.name.toLowerCase().includes(textSerch.toLowerCase())))
                                break;
                            case "mayor":
                                filtrado.push(...datosFijos.filter(even => even.category.toLowerCase().includes(lugar.toLowerCase()) && even.capacity > 50000 && even.name.toLowerCase().includes(textSerch.toLowerCase())))
                                break;
                            default:

                                filtrado.push(...datosFijos.filter(even => even.category.toLowerCase().includes(lugar.toLowerCase()) && even.name.toLowerCase().includes(textSerch.toLowerCase())))
                        }
                    }
                })
            } else if (textSerch == undefined && valueCheckbox.length == 0) {
                filtrado.push(...datosFijos)
            } else {
                switch (valueSelect) {
                    case "menor":
                        filtrado.push(...datosFijos.filter(even => even.capacity < 50000 && even.name.toLowerCase().includes(textSerch.toLowerCase())))
                        break;
                    case "mayor":
                        filtrado.push(...datosFijos.filter(even => even.capacity > 50000 && even.name.toLowerCase().includes(textSerch.toLowerCase())))
                        break;
                    default:
                        filtrado.push(...datosFijos.filter(even => even.name.toLowerCase().includes(textSerch.toLowerCase())))
                }
            }
            imprimirPantalla(filtrado)
        })
    })
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
            `<a class="linkCard" href="../detalle.html?id=${evento.id}" >
         <div class="card">
            <img src="${evento.image}" alt="feriaComida">
            <div class="cardBody">
                <h3 class="pCard">${evento.name}</h3>
                <p class="pCard"><strong>Date:</strong> ${evento.date} </p>
                <p class="pCard"><strong>Place:</strong> ${evento.category}</p>
                <p class="pCard"><strong>Description:</strong> ${evento.description}
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
                console.log("entra en menor")
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
                filtrado.push(...datosFijos.filter(even => even.capacity > 5000 && even.name.toLowerCase().includes(inputVlaue.toLowerCase())))
                break;
            default:
                filtrado.push(...datosFijos.filter(even => even.name.toLowerCase().includes(inputVlaue.toLowerCase())))
        }
    }
    return filtrado
}


registro.addEventListener("click", () => {
    window.location = "../registro.html"
})


