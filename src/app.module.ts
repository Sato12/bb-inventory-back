import { Controller, Module } from '@nestjs/common';
import { ControllerModule } from './controller/controller.module';
import { LogicModule } from './businesslogic/logic.module';
import { ExternalModule } from './external/external.module';
import { ExceptionManager } from './config/exceptionManager.filter';

@Module({
  imports: [ControllerModule, LogicModule, ExternalModule],
  controllers: [],
  providers: [
    {
      provide: 'ExceptionManager',
      useClass: ExceptionManager,
    },
  ],
})
export class AppModule {}
