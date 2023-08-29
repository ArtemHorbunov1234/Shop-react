import Card from './component/Card';

function Home({ items, searchItems, onChangeSearchInput, onAddToFavorite, onAddToCart, cartItems, setSearchItems }) {
    return (
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
                    .map((item) => (
                        <Card
                            key={item.id}
                            id={Number(item.id)}
                            imgUrl={item.imgUrl}
                            name={item.name}
                            price={item.price}
                            onBuyCart={(obj) => onAddToCart(obj)}
                            onFavorite={(obj) => onAddToFavorite(obj)}
                            added={cartItems.some((obj) => Number(obj.itemId) === Number(item.id))}
                        />
                    ))}
            </section>
        </div>
    );
}

Home.propTypes = {
    items: PropTypes.array.isRequired,
    searchItems: PropTypes.string.isRequired,
    onChangeSearchInput: PropTypes.func.isRequired, // ожидаем функцию-обработчик
    onAddToFavorite: PropTypes.func.isRequired,
    onAddToCart: PropTypes.func.isRequired,
    cartItems: PropTypes.func.isRequired,
    setSearchItems: PropTypes.func.isRequired,
};

export default Home;
