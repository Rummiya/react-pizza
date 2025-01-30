export type CartItemState = {
	id: number;
	imageUrl: string;
	title: string;
	price: number;
	type: string;
	size: number;
	count: number;
};

export interface CartState {
	totalPrice: number;
	totalCount: number;
	items: CartItemState[];
}

export enum SortPropertyEnum {
	RATING = 'rating',
	TITLE = 'title',
	PRICE = 'price',
}

export type SortState = {
	name: string;
	sortProperty: SortPropertyEnum;
};

export type SortOrder = 'asc' | 'desc';

export interface FilterState {
	searchValue: string;
	categoryId: number;
	sort: SortState;
	sortOrder: SortOrder;
}

export type Product = {
	id: number;
	title: string;
	desc: string;
	price: number;
	imageUrl: string;
	sizes: number[];
	types: number[];
};

export interface PopapState {
	product: Product;
	isOpened: boolean;
}

export type ProductItem = {
	id: number;
	imageUrl: string;
	title: string;
	desc: string;
	types: number[];
	sizes: number[];
	price: number;
	category: number;
	rating: number;
};

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

export interface ProductState {
	items: ProductItem[];
	status: Status;
}

export type SearchProductsParams = {
	sortBy: SortState;
	category: string;
	sortOrder: SortOrder;
};
