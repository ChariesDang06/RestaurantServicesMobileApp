export interface Dish {
  dishId: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  ingredients: string[];
  stock?: number;
}

export interface Category {
  categoryId: string;
  name: string;
  dishes: Dish[];
}
