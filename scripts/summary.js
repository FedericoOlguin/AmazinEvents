const mayorPorcentaje = document.getElementById("mayorPorcentaje")
const menorPorcentaje = document.getElementById("menorPorcentaje")
const masCapacidad = document.getElementById("masCapacidad")
const ingresosDiv = document.getElementById("table")


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
    await fetch("../AmazingEvents.json")
        .then(promise => promise.json())
        .then(datos => {
            fechaActual = datos.fechaActual
            datosFijos.push(...datos.eventos)
            mayorYmenor()
            mayorCapacity()
            // console.log(mayorPorcAud)
            // console.log(menorPorcAud)
            // console.log(mayorCAp)
            ingresoPorCategoria()
            porcentajePorCategoria()
            // console.table(ingresoXcategoria)
            console.table(porcientoXcategoria)

            mayorPorcentaje.innerText =
                `${mayorPorcAud.name}  -  Assistance: ${mayorPorcAud.asisPorciento.toFixed(2)} %`

            menorPorcentaje.innerText =
                `${menorPorcAud.name}  -  Assistence: ${menorPorcAud.asisPorciento.toFixed(2)} %`
            masCapacidad.innerText =
                `${mayorCAp.name}  -  Capacity: ${mayorCAp.capacity} p`


            //imprime ingresos por categorias 
            ingresosDiv.innerHTML +=
                `<th scope="row" rowspan="${ingresoXcategoria.length + 1}">Ingreso por categoria</th>`
            ingresoXcategoria.forEach(eve => {
                ingresosDiv.innerHTML +=
                    `
                <td colspan="2">Categoria: ${eve.nombre} </td>
                <td>Ingresos: $ ${eve.ingresos} </td>
                    `
            })

            // imprime porcentaje por categoria
            ingresosDiv.innerHTML +=
                `<th scope="row" rowspan="${porcientoXcategoria.length + 1}">Asistencia Por Categoria</th>`
            porcientoXcategoria.forEach(eve => {
                if (isNaN(eve.porcentajeAs)) {
                    ingresosDiv.innerHTML +=
                        `
                <td colspan="2">Categoria: ${eve.nombre} </td>
                <td>Los eventos de esta categoria son para proximas fechas</td>
                    `
                } else {
                    ingresosDiv.innerHTML +=
                        `
                <td colspan="2">Categoria: ${eve.nombre} </td>
                <td>$ ${eve.porcentajeAs} </td>
                    `
                }

            })

        })
}


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
    // arraySort.forEach(even => {
    //     console.log(even.name)
    //     console.log(even.porcientoAsistecia)
    // })
    // console.log(arraySort2)
    mayorPorcAud = arraySort2[0]
    menorPorcAud = arraySort2[arraySort2.length - 1]
}


function mayorCapacity() {
    let arraySort = []
    arraySort.push(...datosFijos)
    arraySort.sort((a, b) => b.capacity - a.capacity)
    mayorCAp = arraySort[0]
}

function ingresoPorCategoria() {
    let arraySort = []
    arraySort.push(...datosFijos)
    let unicos = arraySort.map(evento => evento.category)
    categriasArray = new Set(unicos)
    let categorias = [...categriasArray]
    // console.log(categorias)
    let ingresos = []
    arraySort.map(evento => {
        evento.ingresos = evento.assistance * evento.price
    })
    categorias.forEach(cate => {
        let obj = {}
        let array = arraySort.filter(even => even.category == cate && even.date < fechaActual)
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
    // console.log(arraySort)
    // console.log(categorias)
    // console.log(ingresos)
}

function porcentajePorCategoria() {

    let arraySort = []
    arraySort.push(...datosFijos)
    let categorias = [...categriasArray]
    // console.log(categorias)
    let asistencia = []
    arraySort.map(evento => {
        evento.asisPorciento = (evento.assistance * 100) / evento.capacity
    })
    categorias.forEach(cate => {
        let obj = {}
        let array = arraySort.filter(even => even.category == cate && even.date < fechaActual)
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

