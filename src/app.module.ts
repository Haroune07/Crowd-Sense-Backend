import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ManifestationsModule } from './manifestations/manifestations.module';
import { ReportsModule } from './reports/reports.module';
import { AnnouncementsModule } from './announcements/announcements.module';
import { VotesModule } from './votes/votes.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'crowdsense.sqlite',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    UsersModule,
    AuthModule,
    ManifestationsModule,
    ReportsModule,
    AnnouncementsModule,
    VotesModule,
    SeedModule,
  ],
})
export class AppModule {}
