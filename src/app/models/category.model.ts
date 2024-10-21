export interface Dish {
  dishId: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  ingredients: string[];
  stock?: number;
  options: Options[];
  note: string;
  total: number;
  categoryId: string;
}
export interface Options {
  isChecked: boolean;
  name: string;
  price: number;
}
export interface Category {
  categoryId: string;
  name: string;
  dishes: Dish[];
}
