import { useState } from 'react';
import Card from './component/Card';
import Navigation from './component/Navigation';
import { useEffect } from 'react';
import Cart from './component/Cart';
import axios from 'axios';

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
        if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
            axios.delete(`https://64de62bb825d19d9bfb28c9d.mockapi.io/Cart/${obj.id}`);
            setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
        } else {
            axios.post('https://64de62bb825d19d9bfb28c9d.mockapi.io/Cart', obj).then((res) => {
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
            />
            <hr />
            {visible ? (
                <Cart
                    onCartHidden={() => setVisible(!visible)}
                    onCartEmpty={cartItems.length > 0 ? false : true}
                    items={cartItems}
                    onRemove={onRemoveItem}
                />
            ) : null}
            {cartItemHidden ? (
                <div>
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
                </div>
            ) : (
                <div>
                    <main>
                        <h1> {searchItems.length > 0 ? `Пошук за запитом: ${searchItems}` : 'Усі кросівки'}</h1>
                        <div>
                            <input onChange={onChangeSearchInput} value={searchItems} type='text' placeholder='ПОИСК' />
                            {searchItems.length > 0 ? (
                                <img src='src/img/input_x--letter.svg' onClick={() => setSearchItems('')} alt='' />
                            ) : null}
                        </div>
                    </main>

                    <section>
                        {items
                            .filter((item) => item.name.toLowerCase().includes(String(searchItems).toLowerCase()))
                            .map((item, index) => (
                                <Card
                                    key={index}
                                    id={index}
                                    imgUrl={item.imgUrl}
                                    name={item.name}
                                    price={item.price}
                                    onBuyCart={(obj) => onAddToCart(obj)}
                                    onFavorite={(obj) => onAddToFavorite(obj)}
                                />
                            ))}
                    </section>
                </div>
            )}
        </div>
    );
}

export default App;
