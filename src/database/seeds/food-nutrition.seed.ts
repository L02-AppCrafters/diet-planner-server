import 'dotenv/config';
import { DataSource } from 'typeorm';
import { FoodNutrition } from '../../food-nutrition/entities/food-nutrition.entity';

const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [FoodNutrition],
  synchronize: false,
});

const foods = [
  { name: 'Chicken Breast', servingSize: '100g', calories: 165, proteins: 31, carbohydrates: 0, fats: 3.6, fiber: 0, sugar: 0, sodium: 74, category: 'Protein' },
  { name: 'Salmon', servingSize: '100g', calories: 208, proteins: 20, carbohydrates: 0, fats: 13, fiber: 0, sugar: 0, sodium: 59, category: 'Protein' },
  { name: 'Egg', servingSize: '1 large (50g)', calories: 72, proteins: 6, carbohydrates: 0.4, fats: 5, fiber: 0, sugar: 0.2, sodium: 71, category: 'Protein' },
  { name: 'Tuna (canned)', servingSize: '100g', calories: 116, proteins: 26, carbohydrates: 0, fats: 1, fiber: 0, sugar: 0, sodium: 396, category: 'Protein' },
  { name: 'Beef (lean ground)', servingSize: '100g', calories: 215, proteins: 26, carbohydrates: 0, fats: 12, fiber: 0, sugar: 0, sodium: 75, category: 'Protein' },
  { name: 'Tofu', servingSize: '100g', calories: 76, proteins: 8, carbohydrates: 2, fats: 4.2, fiber: 0.3, sugar: 0.6, sodium: 7, category: 'Protein' },
  { name: 'Greek Yogurt', servingSize: '100g', calories: 59, proteins: 10, carbohydrates: 3.6, fats: 0.4, fiber: 0, sugar: 3.2, sodium: 36, category: 'Dairy' },
  { name: 'Milk (whole)', servingSize: '100ml', calories: 61, proteins: 3.2, carbohydrates: 4.8, fats: 3.3, fiber: 0, sugar: 4.8, sodium: 44, category: 'Dairy' },
  { name: 'Cheddar Cheese', servingSize: '30g', calories: 120, proteins: 7, carbohydrates: 0.4, fats: 10, fiber: 0, sugar: 0.1, sodium: 190, category: 'Dairy' },
  { name: 'White Rice (cooked)', servingSize: '100g', calories: 130, proteins: 2.7, carbohydrates: 28, fats: 0.3, fiber: 0.4, sugar: 0, sodium: 1, category: 'Carb' },
  { name: 'Brown Rice (cooked)', servingSize: '100g', calories: 112, proteins: 2.6, carbohydrates: 24, fats: 0.9, fiber: 1.8, sugar: 0, sodium: 5, category: 'Carb' },
  { name: 'Oats (dry)', servingSize: '100g', calories: 389, proteins: 17, carbohydrates: 66, fats: 7, fiber: 10.6, sugar: 1, sodium: 2, category: 'Carb' },
  { name: 'Whole Wheat Bread', servingSize: '1 slice (30g)', calories: 80, proteins: 4, carbohydrates: 15, fats: 1, fiber: 2, sugar: 1.5, sodium: 132, category: 'Carb' },
  { name: 'Sweet Potato', servingSize: '100g', calories: 86, proteins: 1.6, carbohydrates: 20, fats: 0.1, fiber: 3, sugar: 4.2, sodium: 55, category: 'Carb' },
  { name: 'Quinoa (cooked)', servingSize: '100g', calories: 120, proteins: 4.4, carbohydrates: 22, fats: 1.9, fiber: 2.8, sugar: 0.9, sodium: 7, category: 'Carb' },
  { name: 'Pasta (cooked)', servingSize: '100g', calories: 158, proteins: 5.8, carbohydrates: 31, fats: 0.9, fiber: 1.8, sugar: 0.6, sodium: 1, category: 'Carb' },
  { name: 'Banana', servingSize: '1 medium (118g)', calories: 105, proteins: 1.3, carbohydrates: 27, fats: 0.4, fiber: 3.1, sugar: 14, sodium: 1, category: 'Fruit' },
  { name: 'Apple', servingSize: '1 medium (182g)', calories: 95, proteins: 0.5, carbohydrates: 25, fats: 0.3, fiber: 4.4, sugar: 19, sodium: 2, category: 'Fruit' },
  { name: 'Orange', servingSize: '1 medium (131g)', calories: 62, proteins: 1.2, carbohydrates: 15, fats: 0.2, fiber: 3.1, sugar: 12, sodium: 0, category: 'Fruit' },
  { name: 'Strawberries', servingSize: '100g', calories: 32, proteins: 0.7, carbohydrates: 7.7, fats: 0.3, fiber: 2, sugar: 4.9, sodium: 1, category: 'Fruit' },
  { name: 'Blueberries', servingSize: '100g', calories: 57, proteins: 0.7, carbohydrates: 14, fats: 0.3, fiber: 2.4, sugar: 10, sodium: 1, category: 'Fruit' },
  { name: 'Avocado', servingSize: '100g', calories: 160, proteins: 2, carbohydrates: 9, fats: 15, fiber: 6.7, sugar: 0.7, sodium: 7, category: 'Fruit' },
  { name: 'Broccoli', servingSize: '100g', calories: 34, proteins: 2.8, carbohydrates: 7, fats: 0.4, fiber: 2.6, sugar: 1.7, sodium: 33, category: 'Vegetable' },
  { name: 'Spinach', servingSize: '100g', calories: 23, proteins: 2.9, carbohydrates: 3.6, fats: 0.4, fiber: 2.2, sugar: 0.4, sodium: 79, category: 'Vegetable' },
  { name: 'Carrot', servingSize: '100g', calories: 41, proteins: 0.9, carbohydrates: 10, fats: 0.2, fiber: 2.8, sugar: 4.7, sodium: 69, category: 'Vegetable' },
  { name: 'Tomato', servingSize: '100g', calories: 18, proteins: 0.9, carbohydrates: 3.9, fats: 0.2, fiber: 1.2, sugar: 2.6, sodium: 5, category: 'Vegetable' },
  { name: 'Cucumber', servingSize: '100g', calories: 16, proteins: 0.7, carbohydrates: 3.6, fats: 0.1, fiber: 0.5, sugar: 1.7, sodium: 2, category: 'Vegetable' },
  { name: 'Bell Pepper', servingSize: '100g', calories: 31, proteins: 1, carbohydrates: 7, fats: 0.3, fiber: 2.1, sugar: 3.9, sodium: 4, category: 'Vegetable' },
  { name: 'Onion', servingSize: '100g', calories: 40, proteins: 1.1, carbohydrates: 9.3, fats: 0.1, fiber: 1.7, sugar: 4.2, sodium: 4, category: 'Vegetable' },
  { name: 'Garlic', servingSize: '1 clove (3g)', calories: 4, proteins: 0.2, carbohydrates: 1, fats: 0, fiber: 0.1, sugar: 0, sodium: 1, category: 'Vegetable' },
  { name: 'Almonds', servingSize: '28g (1 oz)', calories: 164, proteins: 6, carbohydrates: 6, fats: 14, fiber: 3.5, sugar: 1.2, sodium: 0, category: 'Nuts & Seeds' },
  { name: 'Peanut Butter', servingSize: '2 tbsp (32g)', calories: 191, proteins: 7, carbohydrates: 7, fats: 16, fiber: 1.6, sugar: 3, sodium: 148, category: 'Nuts & Seeds' },
  { name: 'Chia Seeds', servingSize: '28g (1 oz)', calories: 138, proteins: 4.7, carbohydrates: 12, fats: 8.7, fiber: 9.8, sugar: 0, sodium: 5, category: 'Nuts & Seeds' },
  { name: 'Walnuts', servingSize: '28g (1 oz)', calories: 185, proteins: 4.3, carbohydrates: 4, fats: 18, fiber: 1.9, sugar: 0.7, sodium: 1, category: 'Nuts & Seeds' },
  { name: 'Olive Oil', servingSize: '1 tbsp (14g)', calories: 119, proteins: 0, carbohydrates: 0, fats: 14, fiber: 0, sugar: 0, sodium: 0, category: 'Fats & Oils' },
  { name: 'Butter', servingSize: '1 tbsp (14g)', calories: 102, proteins: 0.1, carbohydrates: 0, fats: 12, fiber: 0, sugar: 0, sodium: 91, category: 'Fats & Oils' },
  { name: 'Black Beans (cooked)', servingSize: '100g', calories: 132, proteins: 8.9, carbohydrates: 24, fats: 0.5, fiber: 8.7, sugar: 0.3, sodium: 1, category: 'Legumes' },
  { name: 'Lentils (cooked)', servingSize: '100g', calories: 116, proteins: 9, carbohydrates: 20, fats: 0.4, fiber: 7.9, sugar: 1.8, sodium: 2, category: 'Legumes' },
  { name: 'Chickpeas (cooked)', servingSize: '100g', calories: 164, proteins: 8.9, carbohydrates: 27, fats: 2.6, fiber: 7.6, sugar: 4.8, sodium: 7, category: 'Legumes' },
  { name: 'Shrimp', servingSize: '100g', calories: 99, proteins: 24, carbohydrates: 0.2, fats: 0.3, fiber: 0, sugar: 0, sodium: 111, category: 'Protein' },
  { name: 'Tilapia', servingSize: '100g', calories: 128, proteins: 26, carbohydrates: 0, fats: 2.7, fiber: 0, sugar: 0, sodium: 56, category: 'Protein' },
  { name: 'Cottage Cheese', servingSize: '100g', calories: 98, proteins: 11, carbohydrates: 3.4, fats: 4.3, fiber: 0, sugar: 2.7, sodium: 364, category: 'Dairy' },
  { name: 'Corn (cooked)', servingSize: '100g', calories: 96, proteins: 3.4, carbohydrates: 21, fats: 1.5, fiber: 2.4, sugar: 4.5, sodium: 15, category: 'Vegetable' },
  { name: 'Potato (boiled)', servingSize: '100g', calories: 87, proteins: 1.9, carbohydrates: 20, fats: 0.1, fiber: 1.8, sugar: 0.9, sodium: 5, category: 'Carb' },
  { name: 'Mango', servingSize: '100g', calories: 60, proteins: 0.8, carbohydrates: 15, fats: 0.4, fiber: 1.6, sugar: 14, sodium: 1, category: 'Fruit' },
  { name: 'Watermelon', servingSize: '100g', calories: 30, proteins: 0.6, carbohydrates: 7.6, fats: 0.2, fiber: 0.4, sugar: 6.2, sodium: 1, category: 'Fruit' },
  { name: 'Kale', servingSize: '100g', calories: 49, proteins: 4.3, carbohydrates: 9, fats: 0.9, fiber: 3.6, sugar: 2.3, sodium: 38, category: 'Vegetable' },
  { name: 'Mushrooms', servingSize: '100g', calories: 22, proteins: 3.1, carbohydrates: 3.3, fats: 0.3, fiber: 1, sugar: 2, sodium: 5, category: 'Vegetable' },
  { name: 'Flaxseeds', servingSize: '1 tbsp (10g)', calories: 55, proteins: 1.9, carbohydrates: 3, fats: 4.3, fiber: 2.8, sugar: 0.2, sodium: 3, category: 'Nuts & Seeds' },
  { name: 'Sunflower Seeds', servingSize: '28g (1 oz)', calories: 164, proteins: 5.5, carbohydrates: 6.5, fats: 14, fiber: 2.4, sugar: 0.8, sodium: 1, category: 'Nuts & Seeds' },
];

async function seed() {
  await dataSource.initialize();
  const repo = dataSource.getRepository(FoodNutrition);

  const count = await repo.count();
  if (count > 0) {
    console.log(`food_nutrition already has ${count} rows — skipping seed.`);
    await dataSource.destroy();
    return;
  }

  await repo.save(foods.map((f) => repo.create(f)));
  console.log(`Seeded ${foods.length} food nutrition records.`);
  await dataSource.destroy();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
