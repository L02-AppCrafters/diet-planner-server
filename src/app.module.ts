import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RecipesModule } from './recipes/recipes.module';
import { MealPlansModule } from './meal-plans/meal-plans.module';
import { User } from './users/entities/user.entity';
import { Recipe } from './recipes/entities/recipe.entity';
import { MealPlan } from './meal-plans/entities/meal-plan.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        entities: [User, Recipe, MealPlan],
        synchronize: configService.get('NODE_ENV') !== 'production',
        logging: configService.get('NODE_ENV') === 'production',
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    RecipesModule,
    MealPlansModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
