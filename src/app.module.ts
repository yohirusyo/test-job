import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import configurationYaml from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './common/guards';
import { ParserModule } from './parser/parser.module';
import { SocketGateway } from './socket/socket.gateway';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurationYaml],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<any>('db.type'),
        host: configService.get<string>('db.host'),
        port: configService.get<Number>('db.port'),
        username: configService.get<string>('db.username'),
        password: configService.get<string>('db.password'),
        database: configService.get<string>('db.database'),
        entities: [User],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),

    AuthModule,
    UserModule,
    ParserModule,
    SocketModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    SocketGateway,
  ],
})
export class AppModule {}
