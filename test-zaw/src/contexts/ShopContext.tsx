import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    createdDate: string;
}

interface ShopContextType {
    products: Product[];
    minPrice: number;
    maxPrice: number;
    sortField: string;
    setMinPrice: (price: number) => void;
    setMaxPrice: (price: number) => void;
    setSortField: (field: string) => void;
}

export const ShopContext = createContext<ShopContextType | undefined>(undefined);

interface ShopProviderProps {
    children: ReactNode;
}

export const ShopProvider: React.FC<ShopProviderProps> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(Infinity);
    const [sortField, setSortField] = useState<string>('name');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('products.json');
                const data: Product[] = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetch:', error);
            }
        };

        fetchProducts();
    }, []);

    const filteredAndSortedProducts = products
        .filter(product => product.price >= minPrice && product.price <= maxPrice)
        .sort((a, b) => {
            if (sortField === 'price') {
                return a.price - b.price;
            } else if (sortField === 'createdDate') {
                return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
            } else {
                return a.name.localeCompare(b.name);
            }
        });

    return (
        <ShopContext.Provider value={{ products: filteredAndSortedProducts, minPrice, maxPrice, sortField, setMinPrice, setMaxPrice, setSortField }}>
            {children}
        </ShopContext.Provider>
    );
};