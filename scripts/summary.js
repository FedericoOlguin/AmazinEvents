let mayorPorcAud = 0
let menorPorcAud = 0
let mayorCAp = 0
let ingresoXcategoria = []
var datosFijos = []
let categriasArray = []
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

        })
}


function mayorYmenor() {
    let arraySort = []
    arraySort.push(...datosFijos)
    arraySort.map(evento => {
        // asistencia*100/capacidad
        evento.porcientoAsistecia = (evento.assistance * 100) / evento.capacity
    })
    arraySort.sort((a, b) => b.porcientoAsistecia - a.porcientoAsistecia)
    // arraySort.forEach(even => {
    //     console.log(even.name)
    //     console.log(even.porcientoAsistecia)
    // })
    mayorPorcAud = arraySort[0]
    menorPorcAud = arraySort[arraySort.length - 1]
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
        console.log(arraySort.filter(even => even.category == cate))
    })


    console.log(arraySort)
    console.log(categorias)
    console.log(ingresos)
}

