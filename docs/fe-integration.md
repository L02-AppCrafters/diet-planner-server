# Diet Planner API — FE Integration Reference

> **Base URL**: `http://localhost:3000` (dev) — replace with hosted URL in production  
> **API Docs (Swagger)**: `{BASE_URL}/api`  
> **Stack**: NestJS REST API · JWT Bearer auth · PostgreSQL

---

## Authentication

All protected endpoints require an `Authorization` header:

```
Authorization: Bearer <accessToken>
```

**Token lifecycle:**
- `accessToken` — expires in **15 minutes**
- `refreshToken` — expires in **7 days**

When the access token expires, call `POST /auth/refresh` with the refresh token to get a new pair. Store both tokens securely (e.g. SecureStore on React Native).

---

## 1. Auth

### Register

| | |
|---|---|
| **Method** | `POST` |
| **Path** | `/auth/register` |
| **Auth** | None |

**Request body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response `201`:**
```json
{
  "accessToken": "eyJ...",
  "refreshToken": "eyJ..."
}
```

**Errors:** `409` Email already in use

---

### Login

| | |
|---|---|
| **Method** | `POST` |
| **Path** | `/auth/login` |
| **Auth** | None |

**Request body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response `200`:**
```json
{
  "accessToken": "eyJ...",
  "refreshToken": "eyJ..."
}
```

**Errors:** `401` Invalid credentials

---

### Refresh Token

| | |
|---|---|
| **Method** | `POST` |
| **Path** | `/auth/refresh` |
| **Auth** | None |

**Request body:**
```json
{
  "refreshToken": "eyJ..."
}
```

**Response `200`:** Same shape as login — new `accessToken` + `refreshToken`

**Errors:** `401` Invalid or expired refresh token

---

### Logout

| | |
|---|---|
| **Method** | `POST` |
| **Path** | `/auth/logout` |
| **Auth** | Bearer |

**Response `200`:**
```json
{ "message": "Logged out successfully" }
```

---

### Get Current User (Auth)

| | |
|---|---|
| **Method** | `GET` |
| **Path** | `/auth/me` |
| **Auth** | Bearer |

**Response `200`:** User object (see Users section for shape)

---

## 2. Users

### Get Profile

| | |
|---|---|
| **Method** | `GET` |
| **Path** | `/users/me` |
| **Auth** | Bearer |

**Response `200`:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John",
  "picture": "https://...",
  "height": "170",
  "weight": "65",
  "gender": "Male",
  "goal": "Weight Loss",
  "calories": 1800,
  "proteins": 120,
  "credit": 5,
  "subscriptionId": null,
  "createdAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-01-01T00:00:00.000Z"
}
```

---

### Update Profile

| | |
|---|---|
| **Method** | `PATCH` |
| **Path** | `/users/me` |
| **Auth** | Bearer |

**Request body** (all fields optional):
```json
{
  "name": "John",
  "picture": "https://...",
  "height": "170",
  "weight": "65",
  "gender": "Male",
  "goal": "Weight Loss",
  "calories": 1800,
  "proteins": 120
}
```

**Response `200`:** Updated user object

---

### Delete Account

| | |
|---|---|
| **Method** | `DELETE` |
| **Path** | `/users/me` |
| **Auth** | Bearer |

**Response `204`:** No content

---

## 3. Recipes

### Get All Recipes

| | |
|---|---|
| **Method** | `GET` |
| **Path** | `/recipes` |
| **Auth** | Bearer |

**Response `200`:** Array of recipe objects

---

### Get Recipe by ID

| | |
|---|---|
| **Method** | `GET` |
| **Path** | `/recipes/:id` |
| **Auth** | Bearer |

**Response `200`:**
```json
{
  "id": "uuid",
  "jsonData": {
    "recipeName": "Grilled Salmon Bowl",
    "description": "...",
    "calories": 520,
    "cookTime": 25,
    "serveTo": 2,
    "category": ["High Protein", "Keto"],
    "ingredients": [
      { "icon": "🐟", "ingredient": "Salmon fillet", "quantity": "200g" }
    ],
    "steps": ["Marinate salmon...", "Grill 4 minutes each side..."]
  },
  "imageUrl": "https://...",
  "recipeName": "Grilled Salmon Bowl",
  "uid": "uuid",
  "createdAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-01-01T00:00:00.000Z"
}
```

**Errors:** `404` Recipe not found

---

### Create Recipe

| | |
|---|---|
| **Method** | `POST` |
| **Path** | `/recipes` |
| **Auth** | Bearer |

**Request body:**
```json
{
  "jsonData": { "recipeName": "...", "calories": 500, "ingredients": [...], "steps": [...] },
  "imageUrl": "https://...",
  "recipeName": "Grilled Salmon Bowl"
}
```

**Response `201`:** Created recipe object

---

### Update Recipe

| | |
|---|---|
| **Method** | `PATCH` |
| **Path** | `/recipes/:id` |
| **Auth** | Bearer |

**Request body:** Any fields from Create Recipe (all optional)

**Response `200`:** Updated recipe object | **Errors:** `404`

---

### Delete Recipe

| | |
|---|---|
| **Method** | `DELETE` |
| **Path** | `/recipes/:id` |
| **Auth** | Bearer |

**Response `204`:** No content | **Errors:** `404`

---

## 4. Meal Plans

### Get Meal Plans

| | |
|---|---|
| **Method** | `GET` |
| **Path** | `/meal-plans` |
| **Auth** | Bearer |
| **Query** | `date` (optional) — filter by date, format `YYYY-MM-DD` |

**Response `200`:** Array of meal plan objects

---

### Get Meal Plan by ID

| | |
|---|---|
| **Method** | `GET` |
| **Path** | `/meal-plans/:id` |
| **Auth** | Bearer |

**Response `200`:**
```json
{
  "id": "uuid",
  "recipeId": "uuid",
  "date": "2026-05-15",
  "mealType": "lunch",
  "uid": "uuid",
  "createdAt": "...",
  "updatedAt": "..."
}
```

**Errors:** `404`

---

### Create Meal Plan

| | |
|---|---|
| **Method** | `POST` |
| **Path** | `/meal-plans` |
| **Auth** | Bearer |

**Request body:**
```json
{
  "recipeId": "uuid",
  "date": "2026-05-15",
  "mealType": "lunch"
}
```

`mealType` values: `breakfast` | `lunch` | `dinner` | `snack`

**Response `201`:** Created meal plan object

---

### Update Meal Plan

| | |
|---|---|
| **Method** | `PATCH` |
| **Path** | `/meal-plans/:id` |
| **Auth** | Bearer |

**Request body:** Any fields from Create (all optional)

**Response `200`:** Updated meal plan | **Errors:** `404`

---

### Delete Meal Plan

| | |
|---|---|
| **Method** | `DELETE` |
| **Path** | `/meal-plans/:id` |
| **Auth** | Bearer |

**Response `204`:** No content | **Errors:** `404`

---

## 5. Favorites

### Toggle Favorite

Adds the recipe to favorites if not already favorited; removes it if it is.

| | |
|---|---|
| **Method** | `POST` |
| **Path** | `/favorites` |
| **Auth** | Bearer |

**Request body:**
```json
{ "recipeId": "uuid" }
```

**Response `201`:**
```json
{ "isFavorited": true }
```
or
```json
{ "isFavorited": false }
```

---

### Get All Favorites

| | |
|---|---|
| **Method** | `GET` |
| **Path** | `/favorites` |
| **Auth** | Bearer |

**Response `200`:** Array of favorite objects, each including the full `recipe`:
```json
[
  {
    "id": "uuid",
    "uid": "uuid",
    "recipeId": "uuid",
    "createdAt": "2026-05-15T...",
    "recipe": {
      "id": "uuid",
      "jsonData": { ... },
      "imageUrl": "https://...",
      "recipeName": "Grilled Salmon Bowl"
    }
  }
]
```

---

## 6. Shopping Lists

### Get All Shopping Lists

| | |
|---|---|
| **Method** | `GET` |
| **Path** | `/shopping-lists` |
| **Auth** | Bearer |

**Response `200`:** Array of shopping list objects with their items

---

### Get Shopping List by ID

| | |
|---|---|
| **Method** | `GET` |
| **Path** | `/shopping-lists/:id` |
| **Auth** | Bearer |

**Response `200`:**
```json
{
  "id": "uuid",
  "uid": "uuid",
  "name": "Weekly Groceries",
  "items": [
    {
      "id": "uuid",
      "shoppingListId": "uuid",
      "ingredient": "Salmon fillet",
      "quantity": "200g",
      "icon": "🐟",
      "isPurchased": false,
      "recipeId": "uuid",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ],
  "createdAt": "...",
  "updatedAt": "..."
}
```

**Errors:** `404`

---

### Create Shopping List

| | |
|---|---|
| **Method** | `POST` |
| **Path** | `/shopping-lists` |
| **Auth** | Bearer |

**Request body:**
```json
{ "name": "Weekly Groceries" }
```

`name` is optional — defaults to `"Shopping List"`

**Response `201`:** Created list (without items)

---

### Delete Shopping List

| | |
|---|---|
| **Method** | `DELETE` |
| **Path** | `/shopping-lists/:id` |
| **Auth** | Bearer |

**Response `204`:** No content (all items cascade-deleted) | **Errors:** `404`

---

### Add Items from Recipe

Parses `ingredients` from a recipe's `jsonData` and bulk-inserts them as shopping list items.

| | |
|---|---|
| **Method** | `POST` |
| **Path** | `/shopping-lists/:id/items/from-recipe` |
| **Auth** | Bearer |

**Request body:**
```json
{ "recipeId": "uuid" }
```

**Response `201`:** Array of created `ShoppingListItem` objects

**Errors:** `404` List or recipe not found

---

### Add Manual Item

| | |
|---|---|
| **Method** | `POST` |
| **Path** | `/shopping-lists/:id/items` |
| **Auth** | Bearer |

**Request body:**
```json
{
  "ingredient": "Olive oil",
  "quantity": "1 bottle",
  "icon": "🫒",
  "recipeId": "uuid"
}
```

`quantity`, `icon`, and `recipeId` are optional.

**Response `201`:** Created item

---

### Update Item (Toggle Purchased)

| | |
|---|---|
| **Method** | `PATCH` |
| **Path** | `/shopping-lists/items/:itemId` |
| **Auth** | Bearer |

**Request body:**
```json
{ "isPurchased": true }
```

**Response `200`:** Updated item | **Errors:** `404`

---

### Delete Item

| | |
|---|---|
| **Method** | `DELETE` |
| **Path** | `/shopping-lists/items/:itemId` |
| **Auth** | Bearer |

**Response `204`:** No content | **Errors:** `404`

---

## 7. Daily Logs

### Get Log(s)

| | |
|---|---|
| **Method** | `GET` |
| **Path** | `/daily-logs` |
| **Auth** | Bearer |

**Query params (use one pattern):**

| Pattern | Params | Returns |
|---|---|---|
| Single day | `date=YYYY-MM-DD` | Single log object or `null` |
| Date range | `startDate=YYYY-MM-DD&endDate=YYYY-MM-DD` | Array of log objects |

**Response `200` (single day):**
```json
{
  "id": "uuid",
  "uid": "uuid",
  "logDate": "2026-05-15",
  "calories": 1650,
  "proteins": 110,
  "carbs": 190,
  "fats": 55,
  "waterMl": 2000,
  "notes": "Felt good today",
  "createdAt": "...",
  "updatedAt": "..."
}
```

Returns `null` (not 404) if no log exists for the requested date.

---

### Upsert Daily Log

Creates a new log for the date or updates the existing one. Safe to call multiple times per day.

| | |
|---|---|
| **Method** | `PUT` |
| **Path** | `/daily-logs` |
| **Auth** | Bearer |

**Request body:**
```json
{
  "logDate": "2026-05-15",
  "calories": 1650,
  "proteins": 110,
  "carbs": 190,
  "fats": 55,
  "waterMl": 2000,
  "notes": "Felt good today"
}
```

`logDate` is required. All macro fields are optional (default `0`).

**Response `200`:** The upserted log object

---

## 8. Food Nutrition

Public endpoint — no authentication required.

### Search Food Nutrition

| | |
|---|---|
| **Method** | `GET` |
| **Path** | `/food-nutrition` |
| **Auth** | None |

**Query params (all optional):**

| Param | Type | Description |
|---|---|---|
| `search` | string | Partial name match (case-insensitive) |
| `category` | string | Filter by category (see below) |
| `page` | number | Page number, default `1` |
| `limit` | number | Items per page, default `20` |

**Categories:** `Protein` · `Dairy` · `Carb` · `Fruit` · `Vegetable` · `Nuts & Seeds` · `Fats & Oils` · `Legumes`

**Response `200`:**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Chicken Breast",
      "servingSize": "100g",
      "calories": 165,
      "proteins": 31,
      "carbohydrates": 0,
      "fats": 3.6,
      "fiber": 0,
      "sugar": 0,
      "sodium": 74,
      "category": "Protein",
      "imageUrl": null,
      "createdAt": "...",
      "updatedAt": "..."
    }
  ],
  "total": 50,
  "page": 1,
  "limit": 20
}
```

---

## Common Error Responses

| Status | Meaning |
|---|---|
| `400` | Validation error — check request body |
| `401` | Missing or invalid Bearer token |
| `404` | Resource not found |
| `409` | Conflict — e.g. email already registered |

All error responses follow NestJS default format:
```json
{
  "statusCode": 404,
  "message": "Recipe not found",
  "error": "Not Found"
}
```
