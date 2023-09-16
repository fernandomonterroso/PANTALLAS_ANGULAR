import { CartComponent } from './shared/components/cart/cart.component';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BasculaModule } from './pages/bascula/bascula.module';
import { ExpobasculaModule } from './pages/expobascula/expobascula.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ConfigurarPuertaComponent } from './shared/components/modals/configurar-puerta/configurar-puerta.component';
import { DialogComponent } from './shared/components/modals/dialog/dialog.component';
import { ExpobasculaComponent } from './pages/expobascula/expobascula.component';
import { BasculaComponent } from './pages/bascula/bascula.component';
import { HttpLoadingInterceptor } from './core/errors/http-loading.interceptor';
import { GlobalErrorHandler } from './core/errors/global-error-handler';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SwiperModule } from 'swiper/angular';
import { configEquipoComponent } from './shared/components/modals/configEquipo/configEquipo.component';
import { BnNgIdleModule } from 'bn-ng-idle';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    NavbarComponent,
    ConfigurarPuertaComponent,
    DialogComponent,
    configEquipoComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CarouselModule,
    SwiperModule,
    BasculaModule,
    ExpobasculaModule,
    ReactiveFormsModule,
  ],
  providers: [
    BnNgIdleModule,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoadingInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
