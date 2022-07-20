export class Sucursales {
  constructor(
    public _id: String,
    public nombreSucursal: String,
    public direccion: String,
    public departamento: string,
    public SuperGas: Number,
    public regular: Number,
    public diesel: Number,
    public market: Boolean,
    public idGasolinera: String
  ){}
}
