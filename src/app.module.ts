import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RecipesModule } from './recipes/recipes.module';
import { MealPlansModule } from './meal-plans/meal-plans.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ShoppingListsModule } from './shopping-lists/shopping-lists.module';
import { DailyLogsModule } from './daily-logs/daily-logs.module';
import { FoodNutritionModule } from './food-nutrition/food-nutrition.module';
import { HealthModule } from './health/health.module';
import { AiModule } from './ai/ai.module';
import { User } from './users/entities/user.entity';
import { Recipe } from './recipes/entities/recipe.entity';
import { MealPlan } from './meal-plans/entities/meal-plan.entity';
import { Favorite } from './favorites/entities/favorite.entity';
import { ShoppingList } from './shopping-lists/entities/shopping-list.entity';
import { ShoppingListItem } from './shopping-lists/entities/shopping-list-item.entity';
import { DailyLog } from './daily-logs/entities/daily-log.entity';
import { FoodNutrition } from './food-nutrition/entities/food-nutrition.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        entities: [
          User,
          Recipe,
          MealPlan,
          Favorite,
          ShoppingList,
          ShoppingListItem,
          DailyLog,
          FoodNutrition,
        ],
        // synchronize: configService.get('NODE_ENV') !== 'production',
        synchronize: true,
        logging: configService.get('NODE_ENV') === 'production',
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    RecipesModule,
    MealPlansModule,
    FavoritesModule,
    ShoppingListsModule,
    DailyLogsModule,
    FoodNutritionModule,
    HealthModule,
    AiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
