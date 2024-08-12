import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { Project } from './project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project])], // Import TypeOrmModule and include Project entity
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
