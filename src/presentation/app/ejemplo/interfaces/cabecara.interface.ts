export interface Cabecera {
    codigo:number,
    descripcion: string,
    fecha: Date | string | number,
    detalle: string,
    archivo: any,
    estado: number
}

export interface Detalle {
    descripcion: string
}
export interface Conciliado {
    clasePrueba: Cabecera,
    claseDetallePrueba: Detalle[]
}