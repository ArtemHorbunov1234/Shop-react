import { useState } from 'react';
import Navigation from './component/Navigation';
import { useEffect } from 'react';
import Cart from './component/Cart';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Favorite from './pages/Favorite';
import Order from './pages/Order';

function App() {
    const [visible, setVisible] = useState(false);
    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [searchItems, setSearchItems] = useState([]);
    const [favorite, setFavorite] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOrder, setIsOrder] = useState([]);
    const [isOrderComplete, setIsOrderComplete] = useState(true);
    const [isCustom, setIsCustom] = useState();
    const [isManyCart, setIsManyCart] = useState(0);

    const onChangeSearchInput = (event) => {
        setSearchItems(event.target.value);
    };
    useEffect(() => {
        document.title = 'Sneakers';
    }, []);

    useEffect(() => {
        async function fetchDate() {
            const cartResponse = await axios.get('https://64de62bb825d19d9bfb28c9d.mockapi.io/Cart');
            const favoriteResponse = await axios.get('https://64de62bb825d19d9bfb28c9d.mockapi.io/Favorite');
            const itemsResponse = await axios.get('https://64de62bb825d19d9bfb28c9d.mockapi.io/Items');
            const orderResponse = await axios.get('https://64de62bb825d19d9bfb28c9d.mockapi.io/Order');
            setIsManyCart(cartResponse.data.length);
            setIsLoading(false);
            setIsOrder(orderResponse.data);
            setCartItems(cartResponse.data);
            setFavorite(favoriteResponse.data);
            setItems(itemsResponse.data);
        }
        fetchDate();
    }, []);

    const onRemoveItem = (id) => {
        axios.delete(`https://64de62bb825d19d9bfb28c9d.mockapi.io/Cart/${id}`);
        setCartItems((prev) => prev.filter((item) => item.id !== id));
        setIsManyCart(Number(isManyCart - 1));
    };
    const onAddToCart = async (obj) => {
        const existingItem = cartItems.find((item) => Number(item.itemId) === Number(obj.id));
        if (existingItem !== undefined) {
            axios.delete(`https://64de62bb825d19d9bfb28c9d.mockapi.io/Cart/${existingItem.id}`);
            setCartItems((prev) => prev.filter((item) => Number(item.itemId) !== Number(obj.id)));
            setIsManyCart(Number(isManyCart - 1));
        } else {
            const cartObj = {
                imgUrl: obj.imgUrl,
                price: obj.price,
                name: obj.name,
                itemId: obj.id,
            };
            try {
                axios.post('https://64de62bb825d19d9bfb28c9d.mockapi.io/Cart', cartObj).then((res) => {
                    setCartItems((prev) => [...prev, res.data]);
                    setIsManyCart(Number(isManyCart + 1));
                });
            } catch {
                console.log('Error');
            }
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

    const data = {
        cartItems: cartItems,
    };

    const onClickBuyCart = async () => {
        try {
            axios.post('https://64de62bb825d19d9bfb28c9d.mockapi.io/Order', data).then((response) => {
                setIsOrder((res) => [...res, response.data]);
                setIsCustom(() => response.data.id);
            });
        } catch (error) {
            console.error('Ошибка при создании заказа:', error);
        }
        setCartItems([]);
        setIsOrderComplete(false);
        setIsManyCart(Number(0));

        for (let i = 0; i < cartItems.length; i++) {
            const item = cartItems[i];
            axios.delete('https://64de62bb825d19d9bfb28c9d.mockapi.io/Cart/' + item.id);
        }
    };

    return (
        <div className='content'>
            <Navigation
                cartChange={cartItems}
                onHeard={favorite}
                onCart={() => setVisible(!visible)}
                priceCart={cartItems.reduce((sum, obj) => obj.price + sum, 0)}
                manyCart={isManyCart}
            />
            <hr />

            {visible ? (
                <Cart
                    onCartHidden={() => setVisible(!visible)}
                    onCartEmpty={cartItems.length > 0 ? false : true}
                    items={cartItems}
                    onRemove={onRemoveItem}
                    priceCart={cartItems.reduce((sum, obj) => obj.price + sum, 0)}
                    headerCart={isOrderComplete ? 'Кошик порожній' : 'Замовлення оформлене!'}
                    textCart={
                        isOrderComplete
                            ? 'Додайте хоча б одну пару кросівок, щоб зробити замовлення.'
                            : `Ваше замовлення #${isCustom} скоро буде передано кур'єрській доставці`
                    }
                    imgUrlCart={isOrderComplete ? 'img/cart.svg' : 'img/buySneakers.svg'}
                    buyCartSneakers={() => onClickBuyCart()}
                    isManyActionCart={isManyCart}
                />
            ) : null}

            <Routes>
                <Route
                    path='/Shop-react'
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
            <Routes>
                <Route
                    path='/favorite'
                    element={<Favorite favorite={favorite} onRemoveFavorite={onRemoveFavorite} />}
                />
            </Routes>
            <Routes>
                <Route path='/order' element={<Order order={isOrder} />} />
            </Routes>
        </div>
    );
}

export default App;
