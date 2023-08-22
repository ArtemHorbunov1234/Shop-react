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
    }, []);

    const onRemoveItem = (id) => {
        axios.delete(`https://64de62bb825d19d9bfb28c9d.mockapi.io/Cart/${id}`);
        setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    };

    const onAddToCart = (obj) => {
        axios.post('https://64de62bb825d19d9bfb28c9d.mockapi.io/Cart', obj);
        setCartItems((prev) => [...prev, obj]);
    };

    return (
        <div className='content'>
            <Navigation onFavorite={() => setCartItemHidden(!cartItemHidden)} onCart={() => setVisible(!visible)} />
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
                    <div className='favorite'>
                        <img src='src/img/exit_favorite.svg' alt='exit' />
                        <h1>Мої закладки</h1>
                    </div>
                    <div className='favorite__item'>
                        {items.map((obj, index) => (
                            <div className='favorite--item' key={index}>
                                <img className='favorite--item__img' src='src/img/heart-shop_3.svg' alt='' />
                                <div>
                                    <img src={obj.imgUrl} alt='sneaker' />
                                </div>
                                <h1>{obj.name}</h1>

                                <div>
                                    <b>{obj.price} грн</b>
                                    <img src='src/img/delete-icon.svg' alt='delete-icon' />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <main>
                        <h1> {searchItems ? `Пошук за запитом: ${searchItems}` : 'Усі кросівки'}</h1>
                        <input onChange={onChangeSearchInput} value={searchItems} type='text' placeholder='ПОИСК' />
                    </main>

                    <section>
                        {items
                            .filter((item) => item.name.toLowerCase().includes(String(searchItems).toLowerCase()))
                            .map((item, index) => (
                                <Card
                                    key={index}
                                    imgUrl={item.imgUrl}
                                    name={item.name}
                                    price={item.price}
                                    onBuyCart={(obj) => onAddToCart(obj)}
                                />
                            ))}
                    </section>
                </div>
            )}
        </div>
    );
}

export default App;
