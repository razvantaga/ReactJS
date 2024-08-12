import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { ProjectModule } from './project/project.module';
import { Project } from './project/project.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Webdev2022.',
      database: 'ReactJS',
      entities: [Project],
      synchronize: true, // Ensure this is set to true during development
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Serve static files from the 'uploads' directory
      serveRoot: '/uploads',
    }),
    ProjectModule,
  ],
})
export class AppModule {}
