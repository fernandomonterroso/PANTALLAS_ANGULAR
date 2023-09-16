import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'products',
    loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule)
  },
  { path: 'checkout', loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule)},
  { path: 'acceso', loadChildren: () => import('./pages/acceso/acceso.module').then(m => m.AccesoModule) },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'frame', loadChildren: () => import('./pages/frame/frame.module').then(m => m.FrameModule) },
  { path: 'expobascula', loadChildren: () => import('./pages/expobascula/expobascula.module').then(m => m.ExpobasculaModule), children: [
    { path: '', loadChildren: () => import('./pages/expobascula/expobascula.module').then(m => m.ExpobasculaModule)},
    { path: 'bascula', loadChildren: () => import('./pages/bascula/bascula.module').then(m => m.BasculaModule)},
    { path: 'pesajetara', loadChildren: () => import('./pages/pesotara/pesotara.module').then(m => m.PesotaraModule) },
    { path: 'pesajecarga', loadChildren: () => import('./pages/pesocarga/pesocarga.module').then(m => m.PesocargaModule) },
    { path: 'guias_hijas', loadChildren: () => import('./pages/guias_hijas/guias.module').then(m => m.GuiasModule)},
    { path: 'mainExpo', loadChildren: () => import('./pages/main-expo/main-expo.module').then(m => m.MainExpoModule)},
    { path: 'equipos', loadChildren: () => import('./pages/equipos/equipos.module').then(m => m.EquiposModule) },
    { path: 'pase', loadChildren: () => import('./pages/pase-vehicular/pase-vehicular.module').then(m => m.PaseVehicularModule) },
  ] },
  
  
  
  
  { path: '**', redirectTo: '', pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
