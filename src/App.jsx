import { useState } from 'react';
import Card from './component/Card';
import Navigation from './component/Navigation';
import { useEffect } from 'react';
import Cart from './component/Cart';

function MainShop() {
    return (
        <main>
            <h1>Усі кросівки</h1>
            <input type='text' placeholder='ПОИСК' />
        </main>
    );
}

function App() {
    const [visible, setVisible] = useState(false);
    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetch('https://64de62bb825d19d9bfb28c9d.mockapi.io/Items')
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                setItems(json);
            });
    }, []);
    const onAddToCart = (obj) => {
        setCartItems([...cartItems, obj]);
    };
    return (
        <div className='content'>
            <Navigation onCart={() => setVisible(!visible)} />
            <hr />
            <MainShop />
            {visible ? <Cart items={cartItems} /> : null}
            <section>
                {items.map((item, index) => (
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
    );
}

export default App;
