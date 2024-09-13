import React, { useContext } from 'react';
import { ShopProvider, ShopContext } from '../contexts/ShopContext';
import TopBar from '../components/TopBar';

const ShopContent: React.FC = () => {
    const shopContext = useContext(ShopContext);

    if (!shopContext) {
        return <div>Loading...</div>;
    }

    const { products } = shopContext;

    return (
        <><TopBar />
        <div>
            <h1>Products</h1>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <img src={product.image} alt={product.name} width="50" />
                        <div>{product.name}</div>
                        <div>${product.price}</div>
                    </li>
                ))}
            </ul>
        </div></>
    );
};

const Shop: React.FC = () => {
    return (
        <ShopProvider>
            <ShopContent />
        </ShopProvider>
    );
};

export default Shop;