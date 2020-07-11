import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageContainerModule } from './components/message-container/message-container.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './core/store/reducers';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { CoreStoreModule } from './core/store/core-store.module';
import { EffectsModule } from '@ngrx/effects';

const socketConfig: SocketIoConfig = { url: ':4000', options: {} };

@NgModule({
  declarations: [AppComponent],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MessageContainerModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    SocketIoModule.forRoot(socketConfig),
    EffectsModule.forRoot([]),
    CoreStoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
