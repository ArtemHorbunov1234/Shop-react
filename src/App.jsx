import { useState } from 'react';
import Navigation from './component/Navigation';
import { useEffect } from 'react';
import Cart from './component/Cart';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Favorite from './pages/Favorite';

function App() {
    const [visible, setVisible] = useState(false);
    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [searchItems, setSearchItems] = useState([]);
    const [favorite, setFavorite] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const onChangeSearchInput = (event) => {
        setSearchItems(event.target.value);
    };

    useEffect(() => {
        async function fetchDate() {
            const cartResponse = await axios.get('https://64de62bb825d19d9bfb28c9d.mockapi.io/Cart');
            const favoriteResponse = await axios.get('https://64de62bb825d19d9bfb28c9d.mockapi.io/Favorite');
            const itemsResponse = await axios.get('https://64de62bb825d19d9bfb28c9d.mockapi.io/Items');
            setIsLoading(false);
            setCartItems(cartResponse.data);
            setFavorite(favoriteResponse.data);
            setItems(itemsResponse.data);
        }
        fetchDate();
    }, []);

    const onRemoveItem = (id) => {
        axios.delete(`https://64de62bb825d19d9bfb28c9d.mockapi.io/Cart/${id}`);
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };
    const onAddToCart = (obj) => {
        const existingItem = cartItems.find((item) => Number(item.itemId) === Number(obj.id));
        if (existingItem !== undefined) {
            axios.delete(`https://64de62bb825d19d9bfb28c9d.mockapi.io/Cart/${existingItem.id}`);
            setCartItems((prev) => prev.filter((item) => Number(item.itemId) !== Number(obj.id)));
        } else {
            const cartObj = {
                imgUrl: obj.imgUrl,
                price: obj.price,
                name: obj.name,
                itemId: obj.id,
            };
            axios.post('https://64de62bb825d19d9bfb28c9d.mockapi.io/Cart', cartObj).then((res) => {
                setCartItems((prev) => [...prev, res.data]);
            });
        }
    };

    const onAddToFavorite = (obj) => {
        const existingItem = favorite.find((item) => Number(item.itemId) === Number(obj.id));
        if (existingItem !== undefined) {
            axios.delete(`https://64de62bb825d19d9bfb28c9d.mockapi.io/Favorite/${existingItem.id}`);
            setFavorite((prev) => prev.filter((item) => Number(item.itemId) !== Number(obj.id)));
        } else {
            const favoriteObj = {
                imgUrl: obj.imgUrl,
                price: obj.price,
                name: obj.name,
                itemId: obj.id,
            };
            axios.post('https://64de62bb825d19d9bfb28c9d.mockapi.io/Favorite', favoriteObj).then((res) => {
                setFavorite((prev) => [...prev, res.data]);
            });
        }
    };

    const onRemoveFavorite = (id) => {
        axios.delete(`https://64de62bb825d19d9bfb28c9d.mockapi.io/Favorite/${id}`);
        setFavorite((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <div className='content'>
            <Navigation
                cartChange={cartItems}
                onHeard={favorite}
                onCart={() => setVisible(!visible)}
                priceCart={cartItems.reduce((sum, obj) => obj.price + sum, 0)}
            />
            <hr />
            {visible ? (
                <Cart
                    onCartHidden={() => setVisible(!visible)}
                    onCartEmpty={cartItems.length > 0 ? false : true}
                    items={cartItems}
                    onRemove={onRemoveItem}
                    priceCart={cartItems.reduce((sum, obj) => obj.price + sum, 0)}
                />
            ) : null}

            <Routes>
                <Route
                    path='/favorite'
                    element={<Favorite favorite={favorite} onRemoveFavorite={onRemoveFavorite} />}
                />
            </Routes>
            <Routes>
                <Route
                    path='/'
                    element={
                        <Home
                            items={items}
                            searchItems={searchItems}
                            setSearchItems={setSearchItems}
                            setCartItems={setCartItems}
                            onChangeSearchInput={onChangeSearchInput}
                            onAddToFavorite={onAddToFavorite}
                            onAddToCart={onAddToCart}
                            cartItems={cartItems}
                            favorite={favorite}
                            isLoading={isLoading}
                        />
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
