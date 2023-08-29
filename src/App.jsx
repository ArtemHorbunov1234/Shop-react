import { useState } from 'react';
import Navigation from './component/Navigation';
import { useEffect } from 'react';
import Cart from './component/Cart';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';

function App() {
    const [visible, setVisible] = useState(false);
    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [searchItems, setSearchItems] = useState([]);
    const [favorite, setFavorite] = useState([]);
    const [cartItemHidden, setCartItemHidden] = useState(false);

    const onChangeSearchInput = (event) => {
        setSearchItems(event.target.value);
    };

    useEffect(() => {
        axios.get('https://64de62bb825d19d9bfb28c9d.mockapi.io/Items').then((res) => {
            setItems(res.data);
        });
        axios.get('https://64de62bb825d19d9bfb28c9d.mockapi.io/Cart').then((res) => {
            setCartItems(res.data);
        });
        axios.get('https://64de62bb825d19d9bfb28c9d.mockapi.io/Favorite').then((res) => {
            setFavorite(res.data);
        });
    }, []);

    const onRemoveItem = (id) => {
        axios.delete(`https://64de62bb825d19d9bfb28c9d.mockapi.io/Cart/${id}`);
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };
    const onAddToCart = (obj) => {
        console.log(`${obj.id}`);
        const existingItem = cartItems.find((item) => Number(item.itemId) === Number(obj.id));
        if (existingItem !== undefined) {
            console.log('delete');
            axios.delete(`https://64de62bb825d19d9bfb28c9d.mockapi.io/Cart/${existingItem.id}`);
            setCartItems((prev) => prev.filter((item) => Number(item.itemId) !== Number(obj.id)));
        } else {
            console.log('add');
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
        axios.post('https://64de62bb825d19d9bfb28c9d.mockapi.io/Favorite', obj).then((res) => {
            setFavorite((prev) => [...prev, res.data]);
        });
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
                onFavorite={() => setCartItemHidden(!cartItemHidden)}
                onCart={() => setVisible(!visible)}
                priceCart={cartItems.reduce((sum, obj) => obj.price + sum, 0)}
            />
            <hr />
            <Cart
                onCartHidden={() => setVisible(!visible)}
                onCartEmpty={cartItems.length > 0 ? false : true}
                items={cartItems}
                onRemove={onRemoveItem}
                priceCart={cartItems.reduce((sum, obj) => obj.price + sum, 0)}
            />
            {favorite.length > 0 ? (
                <div>
                    <div className='favorite'>
                        <img
                            onClick={() => setCartItemHidden(!cartItemHidden)}
                            src='src/img/exit_favorite.svg'
                            alt='exit'
                        />
                        <h1>Мої закладки</h1>
                    </div>
                    <div className='favorite__item'>
                        {favorite.map((obj, index) => (
                            <div className='favorite--item' key={index}>
                                <img
                                    className='favorite--item__img'
                                    onClick={() => onRemoveFavorite(obj.id)}
                                    src='src/img/heart-shop_3.svg'
                                    alt=''
                                />
                                <div>
                                    <img src={obj.imgUrl} alt='sneaker' />
                                </div>
                                <h1>{obj.name}</h1>

                                <div>
                                    <b>Цена:</b>
                                    <h3>{obj.price} грн</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className='favorite--item__dont'>
                    <img src='src/img/smile_favorite.svg' alt='smile' />
                    <h1>Закладок немає :(</h1>
                    <p>Ви нічого не додавали в закладки</p>
                    <button onClick={() => setCartItemHidden(!cartItemHidden)}>
                        <img src='src/img/cursor_left-button.svg' alt='' />
                        Повернутися назад
                    </button>
                </div>
            )}
            <Routes>
                <Route
                    path='/'
                    element={
                        <Home
                            items={items}
                            searchItems={setSearchItems}
                            setCartItems={setCartItems}
                            onChangeSearchInput={onChangeSearchInput}
                            onAddToFavorite={onAddToFavorite}
                            onAddToCart={onAddToCart}
                            cartItems={cartItems}
                        />
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
