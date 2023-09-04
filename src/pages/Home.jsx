import Card from '../component/Card';
import PropTypes from 'prop-types';
import styles from './home.module.scss';

function Home({
    items,
    searchItems,
    onChangeSearchInput,
    onAddToFavorite,
    onAddToCart,
    cartItems,
    setSearchItems,
    favorite,
    isLoading,
}) {
    const fakeData = [...Array(12)].map((_, index) => ({
        id: `fake_${index}`,
        name: 'Fake Item',
        price: 0,
        imgUrl: 'path/to/image.png',
    }));
    const renderItems = () => {
        const filtredItems = items.filter((item) =>
            item.name.toLowerCase().includes(String(searchItems).toLowerCase())
        );
        return (isLoading ? fakeData : filtredItems).map((item) => (
            <Card
                key={item.id}
                id={Number(item.id)}
                imgUrl={item.imgUrl}
                name={item.name}
                price={item.price}
                onBuyCart={(obj) => onAddToCart(obj)}
                onFavorite={(obj) => onAddToFavorite(obj)}
                added={cartItems.some((obj) => Number(obj.itemId) === Number(item.id))}
                addedLike={favorite.some((obj) => Number(obj.itemId) === Number(item.id))}
                loading={isLoading}
            />
        ));
    };
    return (
        <div>
            <main className={styles.searchItems}>
                <h1> {searchItems.length > 0 ? `Пошук за запитом: ${searchItems}` : 'Усі кросівки'}</h1>
                <div>
                    <input onChange={onChangeSearchInput} value={searchItems} type='text' placeholder='ПОИСК' />
                    {searchItems.length > 0 ? (
                        <img src='src/img/input_x--letter.svg' onClick={() => setSearchItems('')} alt='' />
                    ) : null}
                </div>
            </main>
            <section>{renderItems()}</section>
        </div>
    );
}

Home.propTypes = {
    items: PropTypes.array.isRequired,
    searchItems: PropTypes.array.isRequired,
    onChangeSearchInput: PropTypes.func.isRequired,
    onAddToFavorite: PropTypes.func.isRequired,
    onAddToCart: PropTypes.func.isRequired,
    cartItems: PropTypes.array.isRequired,
    setSearchItems: PropTypes.func.isRequired,
    favorite: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export default Home;
