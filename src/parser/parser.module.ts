import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { SocketModule } from 'src/socket/socket.module';
import { ParserController } from './parser.controller';
import { ParserService } from './parser.service';

@Module({
  controllers: [ParserController],
  providers: [ParserService, ConfigService],
  imports: [HttpModule, ScheduleModule.forRoot(), SocketModule],
})
export class ParserModule {}
