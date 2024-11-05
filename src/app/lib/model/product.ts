import Category from '@/app/lib/model/category'

interface Product {
    product_id: string;
    updated_at: { seconds: number; nanoseconds: number };
    created_at: { seconds: number; nanoseconds: number };
    price: string;
    description: string;
    user_id: string;
    category_id: string;
    quantityInStock: string;
    name: string;
    category?: Category;
    image_url: string;
}

export default Product