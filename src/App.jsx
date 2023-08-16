import Card from './component/Card';
import Navigation from './component/Navigation';

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
    return (
        <div className='content'>
            <Navigation />
            <hr />
            <MainShop />
            <section>
                {arr.map((obj, index) => (
                    <Card key={index} imgUrl={obj.imgUrl} name={obj.name} price={obj.price} />
                ))}
            </section>
        </div>
    );
}

export default App;
