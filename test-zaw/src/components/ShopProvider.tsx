import React from 'react';
import { ShopProvider } from '../contexts/ShopContext';

const App: React.FC = () => {
    return (
        <ShopProvider children={undefined} />
    );
};

export default App;