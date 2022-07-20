export class Sucursales {
  constructor(
    public _id: String,
    public nombreSucursal: String,
    public direccion: String,
    public departamento: string,
    public Super: Number,
    public regular: Number,
    public diesel: Number
  ){}
}
