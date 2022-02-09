const mayorPorcentaje = document.getElementById("mayorPorcentaje")
const menorPorcentaje = document.getElementById("menorPorcentaje")
const masCapacidad = document.getElementById("masCapacidad")
const ingresosDiv = document.getElementById("table")
const busqueda = document.getElementById("busqueda")
const registro = document.getElementById("registro")


let mayorPorcAud = 0
let menorPorcAud = 0
let mayorCAp = 0
let ingresoXcategoria = []
var datosFijos = []
let categriasArray = []
let porcientoXcategoria = []
let fechaActual = ""

getData()

async function getData() {
    await fetch("https://amazingeventsapi.herokuapp.com/api/eventos")
        .then(promise => promise.json())
        .then(datos => {
            fechaActual = datos.fechaActual
            datosFijos.push(...datos.eventos)
            mayorYmenor()
            mayorCapacity()
            ingresoPorCategoria()
            porcentajePorCategoria()

            //imprime evento con  Mayor porcentaje de asistencia 
            mayorPorcentaje.innerText =
                `${mayorPorcAud.name}  -  Assistance: ${mayorPorcAud.asisPorciento.toFixed(2)} %`

            //imprime evento con  Menor porcentaje de asistencia
            menorPorcentaje.innerText =
                `${menorPorcAud.name}  -  Assistence: ${menorPorcAud.asisPorciento.toFixed(2)} %`
            //imprime evento con Mayor capacidad
            masCapacidad.innerText =
                `${mayorCAp.name}  -  Capacity: ${mayorCAp.capacity} p`

            //imprime ingresos por categorias 
            ingresosDiv.innerHTML +=
                `<tr>
                    <th scope="row" rowspan="${ingresoXcategoria.length + 1}">Ingreso por categoria</th>
                </tr>`
            ingresoXcategoria.forEach(eve => {
                ingresosDiv.innerHTML +=
                    `<tr>
                        <td colspan="2"> ${eve.nombre} </td>
                        <td>Ingresos: $ ${eve.ingresos} </td>
                    </tr>`
            })

            // imprime porcentaje por categoria, con un condicional para imprimir un mensaje a eventos futuros
            ingresosDiv.innerHTML +=
                `<tr>
                    <th scope="row" rowspan="${porcientoXcategoria.length + 1}">Asistencia Por Categoria</th>
                </tr>`
            porcientoXcategoria.forEach(eve => {
                if (isNaN(eve.porcentajeAs)) {
                    ingresosDiv.innerHTML +=
                        `<tr>
                            <td colspan="2"> ${eve.nombre} </td>
                            <td>Los eventos de esta categoria son para proximas fechas</td>
                        </tr>`
                } else {
                    ingresosDiv.innerHTML +=
                        `<tr>
                            <td colspan="2"> ${eve.nombre} </td>
                            <td> ${eve.porcentajeAs} %</td>
                        </tr>`
                }
            })
        })
}

// funcion que asigana mayor y menor porcentaje de asistencia
function mayorYmenor() {
    let arraySort = []
    arraySort.push(...datosFijos)
    arraySort.map(evento => {
        // asistencia*100/capacidad
        evento.porcientoAsistecia = (evento.assistance * 100) / evento.capacity
    })
    let arraySort2 = []
    arraySort2.push(...arraySort.filter(even => even.assistance != undefined))
    arraySort2.sort((a, b) => b.porcientoAsistecia - a.porcientoAsistecia)
    mayorPorcAud = arraySort2[0]
    menorPorcAud = arraySort2[arraySort2.length - 1]
}

// funcion que asigna el evento con mayor capacidad
function mayorCapacity() {
    let arraySort = []
    arraySort.push(...datosFijos)
    arraySort.sort((a, b) => b.capacity - a.capacity)
    mayorCAp = arraySort[0]
}

// funcion que asigna un objeto con 2 atributos, "categoria e ingresos"
function ingresoPorCategoria() {
    let arraySort = []
    arraySort.push(...datosFijos)
    let unicos = arraySort.map(evento => evento.category)
    categriasArray = new Set(unicos)
    let ingresos = []
    arraySort.map(evento => {
        if (evento.assistance != undefined) {
            evento.ingresos = evento.assistance * evento.price
        }
    })
    categriasArray.forEach(cate => {
        let obj = {}
        let array = arraySort.filter(even => even.category == cate && even.assistance != undefined)
        let total = 0
        array.forEach(val => {
            total += val.ingresos
        })
        obj = {
            nombre: cate,
            ingresos: total
        }
        ingresos.push(obj)
        // console.log(arraySort.filter(even => even.category == cate))
    })
    ingresoXcategoria.push(...ingresos)
}

// funcion que asignan un objeto con 2 atributos, "categoria y porcentaje de asistencia" 
function porcentajePorCategoria() {
    let arraySort = []
    arraySort.push(...datosFijos)
    let categorias = [...categriasArray]
    let asistencia = []
    arraySort.map(evento => {
        evento.asisPorciento = (evento.assistance * 100) / evento.capacity
    })
    categorias.forEach(cate => {
        let obj = {}
        let array = arraySort.filter(even => even.category == cate && even.date < fechaActual && !isNaN(even.asisPorciento))
        let total = 0
        array.forEach(val => {
            total += val.asisPorciento
        })
        total = total / array.length
        obj = {
            nombre: cate,
            porcentajeAs: Number(total.toFixed(2))
        }
        asistencia.push(obj)
        // console.log(arraySort.filter(even => even.category == cate))
    })
    porcientoXcategoria.push(...asistencia)
}



busqueda.addEventListener("click", (e) => {
    window.location = "./search.html"

})
registro.addEventListener("click", () => {
    window.location = "../registro.html"
})
