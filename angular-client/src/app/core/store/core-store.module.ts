import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { MessagesEffects } from './effects/messages';
import { SocketService } from '../services/socket.service';

@NgModule({ imports: [EffectsModule.forFeature([MessagesEffects])], providers: [SocketService] })
export class CoreStoreModule {}
