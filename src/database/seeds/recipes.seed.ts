import 'dotenv/config';
import { DataSource } from 'typeorm';
import { DailyLog } from '../../daily-logs/entities/daily-log.entity';
import { Favorite } from '../../favorites/entities/favorite.entity';
import { FoodNutrition } from '../../food-nutrition/entities/food-nutrition.entity';
import { MealPlan } from '../../meal-plans/entities/meal-plan.entity';
import { Recipe } from '../../recipes/entities/recipe.entity';
import { ShoppingListItem } from '../../shopping-lists/entities/shopping-list-item.entity';
import { ShoppingList } from '../../shopping-lists/entities/shopping-list.entity';
import { User } from '../../users/entities/user.entity';

const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
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
  synchronize: false,
});

type DefaultRecipeSeed = {
  imageFile: string;
  imageLabel: string;
  imagePalette: [string, string, string];
  imageUrl?: string;
  jsonData: Record<string, any>;
  recipeName: string;
};

const recipeInputs = [
  {
    recipeName: 'Pho Bo Beef Noodle Soup',
    imageFile: 'pho-bo.png',
    imageLabel: 'Pho Bo',
    imagePalette: ['#F7D9A6', '#8B4513', '#15803D'],
    jsonData: {
      recipeName: 'Pho Bo Beef Noodle Soup',
      description: 'A fragrant Vietnamese beef noodle soup with rice noodles, lean beef, herbs, and clear broth.',
      calories: 520,
      proteins: 34,
      carbs: 62,
      fats: 14,
      cookTime: 45,
      serveTo: 1,
      mealType: 'breakfast',
      category: ['Vietnamese', 'Breakfast', 'Noodle Soup'],
      ingredients: [
        { icon: 'noodles', ingredient: 'Rice noodles', quantity: '180g cooked' },
        { icon: 'beef', ingredient: 'Lean beef slices', quantity: '120g' },
        { icon: 'broth', ingredient: 'Beef broth', quantity: '450ml' },
        { icon: 'herbs', ingredient: 'Thai basil, cilantro, and scallion', quantity: '1 handful' },
      ],
      steps: [
        'Heat beef broth with star anise, cinnamon, onion, and ginger.',
        'Place cooked rice noodles in a bowl and top with lean beef slices.',
        'Pour hot broth over the beef and garnish with herbs.',
      ],
    },
  },
  {
    recipeName: 'Hu Tieu Pork Rib Noodle Soup',
    imageFile: 'hu-tieu.png',
    imageLabel: 'Hu Tieu',
    imagePalette: ['#F9C784', '#B45309', '#0EA5E9'],
    jsonData: {
      recipeName: 'Hu Tieu Pork Rib Noodle Soup',
      description: 'A light Southern Vietnamese noodle soup with pork ribs, rice noodles, vegetables, and herbs.',
      calories: 560,
      proteins: 36,
      carbs: 66,
      fats: 16,
      cookTime: 50,
      serveTo: 1,
      mealType: 'breakfast',
      category: ['Vietnamese', 'Breakfast', 'Noodle Soup'],
      ingredients: [
        { icon: 'noodles', ingredient: 'Hu tieu rice noodles', quantity: '180g cooked' },
        { icon: 'pork', ingredient: 'Pork ribs', quantity: '160g' },
        { icon: 'broth', ingredient: 'Pork broth', quantity: '450ml' },
        { icon: 'vegetable', ingredient: 'Bean sprouts and chives', quantity: '80g' },
      ],
      steps: [
        'Simmer pork ribs until tender and the broth is clear.',
        'Add cooked noodles to a serving bowl.',
        'Top with ribs, broth, bean sprouts, and chives.',
      ],
    },
  },
  {
    recipeName: 'Com Tam Pork Chop and Egg',
    imageFile: 'com-tam.png',
    imageLabel: 'Com Tam',
    imagePalette: ['#FDE68A', '#92400E', '#EF4444'],
    jsonData: {
      recipeName: 'Com Tam Pork Chop and Egg',
      description: 'Broken rice served with grilled pork chop, fried egg, cucumber, pickled vegetables, and fish sauce.',
      calories: 720,
      proteins: 42,
      carbs: 82,
      fats: 26,
      cookTime: 35,
      serveTo: 1,
      mealType: 'breakfast',
      category: ['Vietnamese', 'Breakfast', 'Rice Plate'],
      ingredients: [
        { icon: 'rice', ingredient: 'Broken rice', quantity: '220g cooked' },
        { icon: 'pork', ingredient: 'Grilled pork chop', quantity: '160g' },
        { icon: 'egg', ingredient: 'Fried egg', quantity: '1 large' },
        { icon: 'vegetable', ingredient: 'Cucumber and pickled carrot', quantity: '100g' },
      ],
      steps: [
        'Grill marinated pork chop until caramelized.',
        'Serve over warm broken rice with a fried egg.',
        'Add cucumber, pickles, and a small side of fish sauce.',
      ],
    },
  },
  {
    recipeName: 'Braised Pork Belly Rice',
    imageFile: 'braised-pork-belly-rice.png',
    imageLabel: 'Thit Kho',
    imagePalette: ['#F6C177', '#7C2D12', '#16A34A'],
    jsonData: {
      recipeName: 'Braised Pork Belly Rice',
      description: 'Vietnamese caramelized pork belly served with steamed rice, boiled egg, and greens.',
      calories: 760,
      proteins: 35,
      carbs: 74,
      fats: 34,
      cookTime: 60,
      serveTo: 1,
      mealType: 'lunch',
      category: ['Vietnamese', 'Lunch', 'Rice Plate'],
      ingredients: [
        { icon: 'pork', ingredient: 'Pork belly', quantity: '150g' },
        { icon: 'rice', ingredient: 'Steamed rice', quantity: '220g cooked' },
        { icon: 'egg', ingredient: 'Boiled egg', quantity: '1 large' },
        { icon: 'vegetable', ingredient: 'Steamed mustard greens', quantity: '80g' },
      ],
      steps: [
        'Braise pork belly with fish sauce, coconut water, garlic, and pepper.',
        'Simmer until the sauce thickens and the pork is tender.',
        'Serve with rice, boiled egg, and greens.',
      ],
    },
  },
  {
    recipeName: 'Lemongrass Chicken Rice Bowl',
    imageFile: 'lemongrass-chicken-rice.png',
    imageLabel: 'Ga Sa',
    imagePalette: ['#FACC15', '#B45309', '#22C55E'],
    jsonData: {
      recipeName: 'Lemongrass Chicken Rice Bowl',
      description: 'Grilled lemongrass chicken with jasmine rice, cucumber, herbs, and light fish sauce dressing.',
      calories: 620,
      proteins: 44,
      carbs: 70,
      fats: 18,
      cookTime: 30,
      serveTo: 1,
      mealType: 'lunch',
      category: ['Vietnamese', 'Lunch', 'High Protein'],
      ingredients: [
        { icon: 'chicken', ingredient: 'Chicken thigh or breast', quantity: '180g' },
        { icon: 'rice', ingredient: 'Jasmine rice', quantity: '200g cooked' },
        { icon: 'herbs', ingredient: 'Lemongrass, garlic, and scallion', quantity: '1 serving' },
        { icon: 'vegetable', ingredient: 'Cucumber and lettuce', quantity: '120g' },
      ],
      steps: [
        'Marinate chicken with lemongrass, garlic, fish sauce, and a little oil.',
        'Grill or pan-sear until cooked through.',
        'Serve with rice, cucumber, lettuce, and herbs.',
      ],
    },
  },
  {
    recipeName: 'Caramelized Fish Clay Pot Rice',
    imageFile: 'caramelized-fish-rice.png',
    imageLabel: 'Ca Kho',
    imagePalette: ['#F59E0B', '#7F1D1D', '#0F766E'],
    jsonData: {
      recipeName: 'Caramelized Fish Clay Pot Rice',
      description: 'Tender fish simmered in caramel sauce and fish sauce, served with rice and vegetables.',
      calories: 610,
      proteins: 39,
      carbs: 68,
      fats: 20,
      cookTime: 40,
      serveTo: 1,
      mealType: 'lunch',
      category: ['Vietnamese', 'Lunch', 'Seafood'],
      ingredients: [
        { icon: 'fish', ingredient: 'White fish fillet or catfish', quantity: '170g' },
        { icon: 'rice', ingredient: 'Steamed rice', quantity: '200g cooked' },
        { icon: 'sauce', ingredient: 'Caramel fish sauce', quantity: '1 serving' },
        { icon: 'vegetable', ingredient: 'Boiled vegetables', quantity: '100g' },
      ],
      steps: [
        'Simmer fish with caramel sauce, fish sauce, garlic, and black pepper.',
        'Cook until the sauce reduces and coats the fish.',
        'Serve with steamed rice and boiled vegetables.',
      ],
    },
  },
  {
    recipeName: 'Vietnamese Chicken Congee',
    imageFile: 'chicken-congee.png',
    imageLabel: 'Chao Ga',
    imagePalette: ['#FDECC8', '#D97706', '#16A34A'],
    jsonData: {
      recipeName: 'Vietnamese Chicken Congee',
      description: 'Comforting rice porridge with shredded chicken, ginger, scallion, and herbs.',
      calories: 430,
      proteins: 30,
      carbs: 54,
      fats: 10,
      cookTime: 45,
      serveTo: 1,
      mealType: 'dinner',
      category: ['Vietnamese', 'Dinner', 'Comfort Food'],
      ingredients: [
        { icon: 'rice', ingredient: 'Rice', quantity: '70g dry' },
        { icon: 'chicken', ingredient: 'Chicken breast or thigh', quantity: '120g cooked' },
        { icon: 'broth', ingredient: 'Chicken broth', quantity: '500ml' },
        { icon: 'herbs', ingredient: 'Ginger, scallion, and cilantro', quantity: '1 serving' },
      ],
      steps: [
        'Cook rice in chicken broth until soft and creamy.',
        'Shred cooked chicken and stir it into the porridge.',
        'Top with ginger, scallion, cilantro, and pepper.',
      ],
    },
  },
  {
    recipeName: 'Vietnamese Vegetable Soup',
    imageFile: 'vegetable-soup.png',
    imageLabel: 'Veg Soup',
    imagePalette: ['#DCFCE7', '#15803D', '#F97316'],
    jsonData: {
      recipeName: 'Vietnamese Vegetable Soup',
      description: 'A light vegetable soup with carrot, potato, cabbage, mushrooms, and clear broth.',
      calories: 260,
      proteins: 10,
      carbs: 42,
      fats: 6,
      cookTime: 30,
      serveTo: 1,
      mealType: 'dinner',
      category: ['Vietnamese', 'Dinner', 'Light'],
      ingredients: [
        { icon: 'vegetable', ingredient: 'Carrot and potato', quantity: '160g' },
        { icon: 'vegetable', ingredient: 'Cabbage and mushrooms', quantity: '180g' },
        { icon: 'broth', ingredient: 'Vegetable broth', quantity: '450ml' },
        { icon: 'herbs', ingredient: 'Scallion and cilantro', quantity: '1 serving' },
      ],
      steps: [
        'Simmer vegetables in clear broth until tender.',
        'Season lightly with salt, pepper, and fish sauce if desired.',
        'Serve warm with fresh herbs.',
      ],
    },
  },
  {
    recipeName: 'Turmeric Fish Noodle Soup',
    imageFile: 'turmeric-fish-noodle-soup.png',
    imageLabel: 'Fish Soup',
    imagePalette: ['#FDE047', '#0E7490', '#16A34A'],
    jsonData: {
      recipeName: 'Turmeric Fish Noodle Soup',
      description: 'A bright fish noodle soup with turmeric, dill, tomato, herbs, and rice noodles.',
      calories: 500,
      proteins: 32,
      carbs: 60,
      fats: 14,
      cookTime: 35,
      serveTo: 1,
      mealType: 'dinner',
      category: ['Vietnamese', 'Dinner', 'Noodle Soup'],
      ingredients: [
        { icon: 'fish', ingredient: 'White fish fillet', quantity: '150g' },
        { icon: 'noodles', ingredient: 'Rice noodles', quantity: '160g cooked' },
        { icon: 'vegetable', ingredient: 'Tomato and dill', quantity: '100g' },
        { icon: 'spice', ingredient: 'Turmeric and garlic', quantity: '1 serving' },
      ],
      steps: [
        'Season fish with turmeric, garlic, and pepper.',
        'Simmer tomato broth and add the fish until cooked.',
        'Serve over rice noodles with dill and herbs.',
      ],
    },
  },
  {
    recipeName: 'Vietnamese Crispy Pancake',
    imageFile: 'banh-xeo.png',
    imageLabel: 'Banh Xeo',
    imagePalette: ['#FACC15', '#0F766E', '#EF4444'],
    jsonData: {
      recipeName: 'Vietnamese Crispy Pancake',
      description: 'A crisp turmeric rice pancake filled with shrimp, pork, bean sprouts, and herbs.',
      calories: 540,
      proteins: 24,
      carbs: 54,
      fats: 26,
      cookTime: 35,
      serveTo: 1,
      mealType: 'snack',
      category: ['Vietnamese', 'Snack', 'Street Food'],
      ingredients: [
        { icon: 'flour', ingredient: 'Rice flour batter with turmeric', quantity: '1 serving' },
        { icon: 'shrimp', ingredient: 'Shrimp', quantity: '80g' },
        { icon: 'pork', ingredient: 'Lean pork slices', quantity: '60g' },
        { icon: 'vegetable', ingredient: 'Bean sprouts and lettuce', quantity: '120g' },
      ],
      steps: [
        'Pour turmeric rice batter into a hot pan and swirl thinly.',
        'Add shrimp, pork, and bean sprouts, then cook until crisp.',
        'Serve with lettuce, herbs, and dipping sauce.',
      ],
    },
  },
  {
    recipeName: 'Vietnamese Mixed Green Salad',
    imageFile: 'vietnamese-green-salad.png',
    imageLabel: 'Green Salad',
    imagePalette: ['#BBF7D0', '#16A34A', '#F97316'],
    jsonData: {
      recipeName: 'Vietnamese Mixed Green Salad',
      description: 'A refreshing salad with greens, cucumber, carrot, herbs, peanuts, and lime fish sauce dressing.',
      calories: 290,
      proteins: 12,
      carbs: 28,
      fats: 15,
      cookTime: 15,
      serveTo: 1,
      mealType: 'snack',
      category: ['Vietnamese', 'Snack', 'Light'],
      ingredients: [
        { icon: 'vegetable', ingredient: 'Mixed greens and cucumber', quantity: '180g' },
        { icon: 'vegetable', ingredient: 'Carrot and herbs', quantity: '80g' },
        { icon: 'nuts', ingredient: 'Roasted peanuts', quantity: '20g' },
        { icon: 'sauce', ingredient: 'Lime fish sauce dressing', quantity: '1 serving' },
      ],
      steps: [
        'Slice vegetables and herbs thinly.',
        'Toss with lime fish sauce dressing.',
        'Top with roasted peanuts before serving.',
      ],
    },
  },
  {
    recipeName: 'Fresh Spring Rolls with Shrimp',
    imageFile: 'fresh-spring-rolls.png',
    imageLabel: 'Spring Rolls',
    imagePalette: ['#E0F2FE', '#0EA5E9', '#22C55E'],
    jsonData: {
      recipeName: 'Fresh Spring Rolls with Shrimp',
      description: 'Fresh rice paper rolls with shrimp, vermicelli, lettuce, cucumber, and herbs.',
      calories: 360,
      proteins: 24,
      carbs: 48,
      fats: 8,
      cookTime: 25,
      serveTo: 1,
      mealType: 'snack',
      category: ['Vietnamese', 'Snack', 'Fresh'],
      ingredients: [
        { icon: 'rice-paper', ingredient: 'Rice paper', quantity: '4 sheets' },
        { icon: 'shrimp', ingredient: 'Shrimp', quantity: '100g cooked' },
        { icon: 'noodles', ingredient: 'Vermicelli noodles', quantity: '90g cooked' },
        { icon: 'herbs', ingredient: 'Lettuce, cucumber, mint, and basil', quantity: '120g' },
      ],
      steps: [
        'Soften rice paper sheets in warm water.',
        'Fill with shrimp, noodles, lettuce, cucumber, and herbs.',
        'Roll tightly and serve with dipping sauce.',
      ],
    },
  },
] satisfies Array<Omit<DefaultRecipeSeed, 'imageUrl'>>;

const defaultRecipes: DefaultRecipeSeed[] = recipeInputs.map((recipe) => ({
  ...recipe,
  imageUrl: createRecipeImageUrl(recipe.imageFile),
}));

async function seed() {
  await dataSource.initialize();
  const repo = dataSource.getRepository(Recipe);

  const deleteResult = await repo.delete({ isDefault: true });
  const recipes = defaultRecipes.map(({ imageFile, imageLabel, imagePalette, ...recipe }) =>
    repo.create({ ...recipe, isDefault: true, uid: null }),
  );

  await repo.save(recipes);
  console.log(`Deleted ${deleteResult.affected ?? 0} old default recipes.`);
  console.log(`Seeded ${recipes.length} Vietnamese default recipes.`);
  await dataSource.destroy();
}

function createRecipeImageUrl(fileName: string) {
  const baseUrl = process.env.PUBLIC_ASSET_BASE_URL ?? `http://localhost:${process.env.PORT ?? 4000}`;
  return `${baseUrl.replace(/\/$/, '')}/recipes/${fileName}`;
}

function createIllustrationDataUri(label: string, palette: [string, string, string]) {
  const [background, primary, accent] = palette;
  const escapedLabel = escapeXml(label);
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${background}"/>
      <stop offset="100%" stop-color="#fff7ed"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#bg)"/>
  <circle cx="600" cy="410" r="250" fill="#ffffff" opacity="0.92"/>
  <ellipse cx="600" cy="500" rx="310" ry="82" fill="${primary}" opacity="0.18"/>
  <path d="M390 415c85-105 335-105 420 0-22 106-398 106-420 0z" fill="#ffffff" stroke="${primary}" stroke-width="22"/>
  <path d="M440 415c70 58 250 58 320 0" fill="none" stroke="${accent}" stroke-width="28" stroke-linecap="round"/>
  <circle cx="505" cy="380" r="34" fill="${primary}" opacity="0.78"/>
  <circle cx="690" cy="378" r="28" fill="${accent}" opacity="0.82"/>
  <path d="M510 482c42-42 138-42 180 0" fill="none" stroke="${primary}" stroke-width="18" stroke-linecap="round"/>
  <text x="600" y="665" fill="#172554" font-family="Arial, Helvetica, sans-serif" font-size="70" font-weight="800" text-anchor="middle">${escapedLabel}</text>
  <text x="600" y="724" fill="#475569" font-family="Arial, Helvetica, sans-serif" font-size="32" font-weight="600" text-anchor="middle">Vietnamese recipe illustration</text>
</svg>`.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
