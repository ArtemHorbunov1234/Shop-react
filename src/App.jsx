import { useState } from 'react';
import Card from './component/Card';
import Navigation from './component/Navigation';

function CartShop() {
    return (
        <div className='cart'>
            <div className='cart__buy'>
                <div>
                    <h1>Кошик</h1>
                    <div>
                        <div>
                            <img src='src/img/sneaker_1.svg' alt='sneaker' />
                        </div>

                        <div>
                            <h1>Мужские Кроссовки Nike Air Max 270</h1>
                            <b>1299 грн</b>
                        </div>
                        <img src='src/img/delete-icon.svg' alt='delete-icon' />
                    </div>
                </div>
            </div>
            <div className='cart__buy'>
                <div>
                    <div>
                        <div>
                            <img src='src/img/sneaker_1.svg' alt='sneaker' />
                        </div>

                        <div>
                            <h1>Мужские Кроссовки Nike Air Max 270</h1>
                            <b>1299 грн</b>
                        </div>
                        <img src='src/img/delete-icon.svg' alt='delete-icon' />
                    </div>
                </div>
            </div>
            <div>
                <h1></h1>
            </div>
        </div>
    );
}

const arr = [
    { imgUrl: 'src/img/sneaker_1.svg', name: 'Мужские Кроссовки Nike Blazer Mid Suede', price: 1299 },
    { imgUrl: 'src/img/sneaker_2.svg', name: 'Мужские Кроссовки Nike Air Max 270', price: 1435 },
    { imgUrl: 'src/img/sneaker_3.svg', name: 'Мужские Кроссовки Nike Blazer Mid Suede', price: 1299 },
    { imgUrl: 'src/img/sneaker_4.svg', name: 'Кроссовки Puma X Aka Boku Future Rider', price: 1299 },
    { imgUrl: 'src/img/sneaker_5.svg', name: 'Мужские Кроссовки Under Armour Curry 8', price: 2999 },
];

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
    return (
        <div className='content'>
            <Navigation />
            <hr />
            <MainShop />
            {visible ? <CartShop /> : null}
            <section>
                {arr.map((obj, index) => (
                    <Card
                        key={index}
                        imgUrl={obj.imgUrl}
                        name={obj.name}
                        price={obj.price}
                        onClickCart={() => setVisible(!visible)}
                    />
                ))}
            </section>
        </div>
    );
}

export default App;
