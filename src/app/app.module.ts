import {  HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductosComponent } from './control_clases/admin_stock/productos/productos.component';
import { GetUserComponent } from './control_clases/admin_user/get-user/get-user.component';
import { GetRolComponent } from './control_clases/admin_rol/get-rol/get-rol.component';
import { GetPedidoComponent } from './control_clases/admin_pedido/get-pedido/get-pedido.component';
import { GetFacturaComponent } from './control_clases/admin_factura/get-factura/get-factura.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateProductosComponent } from './control_clases/admin_stock/create-productos/create-productos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditProductComponent } from './control_clases/admin_stock/edit-product/edit-product.component';
import { CreateUserComponent } from './control_clases/admin_user/create-user/create-user.component';
import { EditUserComponent } from './control_clases/admin_user/edit-user/edit-user.component';
import { EditRolComponent } from './control_clases/admin_rol/edit-rol/edit-rol.component';
import { CreateRolComponent } from './control_clases/admin_rol/create-rol/create-rol.component';
import { GetClienteComponent } from './control_clases/admin_cliente/get-cliente/get-cliente.component';
import { CreateClienteComponent } from './control_clases/admin_cliente/create-cliente/create-cliente.component';
import { EditClienteComponent } from './control_clases/admin_cliente/edit-cliente/edit-cliente.component';
import { CreatePedidoComponent } from './control_clases/admin_pedido/create-pedido/create-pedido.component';
import { EditPedidoComponent } from './control_clases/admin_pedido/edit-pedido/edit-pedido.component';
import { CreateFacturaComponent } from './control_clases/admin_factura/create-factura/create-factura.component';
import { EditFacturaComponent } from './control_clases/admin_factura/edit-factura/edit-factura.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GenerarFacturaComponent } from './control_clases/generacion_facturas/generar-factura/generar-factura.component';
import { LoginComponent } from './access/login/login.component';
import { DashboardComponent } from './access/dashboard/dashboard.component';
import { NewPassComponent } from './access/new-pass/new-pass.component';
// Set the fonts to use


@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    GetUserComponent,
    GetRolComponent,
    GetPedidoComponent,
    GetFacturaComponent,
    FooterComponent,
    NavbarComponent,
    CreateProductosComponent,
    EditProductComponent,
    CreateUserComponent,
    EditUserComponent,
    EditRolComponent,
    CreateRolComponent,
    GetClienteComponent,
    CreateClienteComponent,
    EditClienteComponent,
    CreatePedidoComponent,
    EditPedidoComponent,
    CreateFacturaComponent,
    EditFacturaComponent,
    GenerarFacturaComponent,
    LoginComponent,
    DashboardComponent,
    NewPassComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
