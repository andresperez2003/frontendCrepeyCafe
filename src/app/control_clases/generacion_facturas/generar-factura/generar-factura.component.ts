import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import {  PdfMakeWrapper, Table} from 'pdfmake-wrapper';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ITable } from 'pdfmake-wrapper/lib/interfaces';
import { dowloadFactura, dowloadPedido } from 'src/app/models/dowloadFactura.interface';
PdfMakeWrapper.setFonts(pdfFonts);

type TableRow = [ string, string,string];
type TableRowPedido = [string, number, number];
@Component({
  selector: 'app-generar-factura',
  templateUrl: './generar-factura.component.html',
  styleUrls: ['./generar-factura.component.css'],
})
export class GenerarFacturaComponent implements OnInit {
  public pedidos: Array<any> = [];
  public facturas: Array<any> = [];
   public sumaTotal=0;
  /*   dowload: Array<dowloadFactura>=[]; */
  constructor(
    private activeRouter: ActivatedRoute,
    private route: Router,
    private api: CrudService
  ) {}

  ngOnInit(): void {
    let id = this.activeRouter.snapshot.paramMap.get('id');
     this.api
       .getById('factura/relationsFactura', id)
       .subscribe((data: any) => {});
       this.LoadPedido();
       this.LoadFactura();
  }
  LoadFactura() {
    try {

       let id = this.activeRouter.snapshot.paramMap.get('id');
      this.api.getById('factura/relationsFactura', id).subscribe((data: any) => {
        this.facturas[0] = data;
        let text = this.facturas[0].fechaFactura.split('T00:00:00.000Z');
        this.facturas[0].fechaFactura = text[0];
      });
    } catch (error) {}
  }
  LoadPedido() {
    try {
       let id = this.activeRouter.snapshot.paramMap.get('id');
      this.api.getById('pedido/relations', id).subscribe((data: any) => {
        this.pedidos = data;
        for (let index = 0; index < this.pedidos.length; index++) {
       let suma = this.pedidos[index].precioVentaUnidad;
      this.sumaTotal=this.sumaTotal+suma;
        }
 console.log(this.sumaTotal);
      });
    } catch (error) {}
  }

  async generate() {
    const pdf = new PdfMakeWrapper();

    pdf.add(this.createTableDataFactura(this.facturas));
    pdf.add(this.createTableDataPedidos(this.pedidos));
    pdf.add("Total :  $"+ this.sumaTotal);
    pdf.info({
      title: 'FacturaCliente',
      author: 'Crepe y cafe'
    });
    pdf.create().open();
  }
  createTableDataFactura(data: dowloadFactura[]): ITable {
    [{}];
    return new Table([
      ['Cliente', 'Empleado', 'Fecha'],
      ...this.extractDataFacutra(data),
    ]).margin([125,0,0,0]).
    layout('lightHorizontalLines').end;
  }
  extractDataFacutra(data: dowloadFactura[]): TableRow[] {
    return data.map((row) => [
      row.name_client,
      row.name,
      row.fechaFactura,
    ])
  }
  createTableDataPedidos(data: dowloadPedido[]): ITable {
    [{}];
    return new Table([
      ['Producto', 'Cantidad', 'Precio Unidad'],
      ...this.extractDataPedido(data),
    ])
      .widths([152, 152, 152, 152])
      .margin([0, 100, 0, 25])
      .layout('lightHorizontalLines').end;
  }

    extractDataPedido(data: dowloadPedido[]):TableRowPedido[] {
    return data.map((row) => [
     row.producto,
      row.CantidadProducto,
      row.precioVentaUnidad
    ])
}


}
