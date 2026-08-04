export interface Category {
    name: string;
    subcategories: string[];
}

export interface CategoriesDb {
    categories: Category[];
}