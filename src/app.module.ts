import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlModule } from './url/url.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      envFilePath: '.env',
      expandVariables: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: 5555, // 3306,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_ROOT_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      synchronize: process.env.NODE_ENV === 'development',
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
    }),
    UrlModule,
  ],
})
export class AppModule {}
