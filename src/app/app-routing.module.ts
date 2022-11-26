import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './access/login/login.component';
import { CreateClienteComponent } from './control_clases/admin_cliente/create-cliente/create-cliente.component';
import { EditClienteComponent } from './control_clases/admin_cliente/edit-cliente/edit-cliente.component';
import { GetClienteComponent } from './control_clases/admin_cliente/get-cliente/get-cliente.component';
import { CreateFacturaComponent } from './control_clases/admin_factura/create-factura/create-factura.component';
import { EditFacturaComponent } from './control_clases/admin_factura/edit-factura/edit-factura.component';
import { GetFacturaComponent } from './control_clases/admin_factura/get-factura/get-factura.component';
import { CreatePedidoComponent } from './control_clases/admin_pedido/create-pedido/create-pedido.component';
import { EditPedidoComponent } from './control_clases/admin_pedido/edit-pedido/edit-pedido.component';
import { GetPedidoComponent } from './control_clases/admin_pedido/get-pedido/get-pedido.component';
import { CreateRolComponent } from './control_clases/admin_rol/create-rol/create-rol.component';
import { EditRolComponent } from './control_clases/admin_rol/edit-rol/edit-rol.component';
import { GetRolComponent } from './control_clases/admin_rol/get-rol/get-rol.component';
import { CreateProductosComponent } from './control_clases/admin_stock/create-productos/create-productos.component';
import { EditProductComponent } from './control_clases/admin_stock/edit-product/edit-product.component';
import { ProductosComponent } from './control_clases/admin_stock/productos/productos.component';
import { CreateUserComponent } from './control_clases/admin_user/create-user/create-user.component';
import { EditUserComponent } from './control_clases/admin_user/edit-user/edit-user.component';
import { GetUserComponent } from './control_clases/admin_user/get-user/get-user.component';
import { DashboardComponent } from './access/dashboard/dashboard.component';
import { GenerarFacturaComponent } from './control_clases/generacion_facturas/generar-factura/generar-factura.component';
import { NewPassComponent } from './access/new-pass/new-pass.component';

const routes: Routes = [

    //Inicio
    {path:'', component: LoginComponent},
    {path:'*', component: LoginComponent},

  //Stock paths
  { path: 'stock/productos', component: ProductosComponent },
  { path: 'stock/createProductos', component: CreateProductosComponent },
  { path: 'stock/editProductos/:id', component: EditProductComponent },

  //User paths
  { path: 'user/getUsers', component: GetUserComponent },
  { path: 'user/createUser', component: CreateUserComponent },
  { path: 'user/editUser/:id', component: EditUserComponent },

  //Rol paths
  { path: 'rol/getRols', component: GetRolComponent },
  {path:'rol/createRol', component: CreateRolComponent},
  {path:'rol/editRol/:id', component: EditRolComponent},

  //Pedido paths
  { path: 'pedido/getPedidos', component: GetPedidoComponent },
  {path:'pedido/createPedido/:id', component: CreatePedidoComponent},
  {path:'pedido/editPedido/:id', component: EditPedidoComponent},

  //Facture paths
  { path: 'factura/getFactura', component: GetFacturaComponent },
  {path:'factura/createFactura', component:CreateFacturaComponent},
  {path:'factura/editFactura/:id', component: EditFacturaComponent},

  //Cliente paths
  {path:'cliente/getCliente', component: GetClienteComponent},
  {path:'cliente/createCliente', component: CreateClienteComponent},
  {path:'cliente/editCliente/:id', component: EditClienteComponent},

  //Dowload Facturas paths
  {path:'factura/downloadFactura/:id', component: GenerarFacturaComponent},

  //Access routes
  {path:'access/login', component:LoginComponent},
  //Dashborad
  {path:'access/dashboard', component: DashboardComponent},
  {path:'access/newPass/:id', component: NewPassComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
