import PropTypes from 'prop-types';
import styles from './cart.module.scss';

function Cart({
    onCartHidden,
    onCartEmpty,
    onRemove,
    items = [],
    priceCart,
    headerCart,
    textCart,
    imgUrlCart,
    buyCartSneakers,
    isManyActionCart,
}) {
    let priceTax = (priceCart / 100) * 5;
    let priceACtion = (priceCart / 100) * 80;
    console.log(isManyActionCart);
    return (
        <div className={styles.cart}>
            <div className={styles.cart__buy}>
                <div>
                    <div className={styles.cart__header}>
                        <h1>Кошик</h1>
                        <img onClick={onCartHidden} src='img/cart_x--letter.svg' alt='' />
                    </div>

                    <div className={onCartEmpty ? styles.Cart__empty : styles['Cart__empty--none']}>
                        <div>
                            <img src={`${imgUrlCart}`} alt='cart' />
                        </div>
                        <div>
                            <h1>{headerCart}</h1>
                        </div>
                        <div>
                            <p>{textCart}</p>
                        </div>
                        <div>
                            <button onClick={onCartHidden}>
                                <img src='img/cursor_left-button.svg' alt='' />
                                Повернутися назад
                            </button>
                        </div>
                    </div>
                    {items.map((obj) => (
                        <div className={styles['cart__buy--item']} key={obj.id}>
                            <>
                                <img className={styles.cart__img} src={obj.imgUrl} alt='sneaker' />
                            </>

                            <div>
                                <h1>{obj.name}</h1>
                                <b>{obj.price} грн</b>
                            </div>
                            <img
                                className={styles['cart__img--delete']}
                                onClick={() => {
                                    onRemove(obj.id);
                                }}
                                src='img/delete-icon.svg'
                                alt='delete-icon'
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className={onCartEmpty ? styles['Cart__empty--none'] : styles.cart__pay}>
                <div>
                    <h1>Разом:</h1>
                    {isManyActionCart >= 3 ? (
                        <div>
                            <b className={styles['cart__pay--action']}>{priceACtion.toFixed(2)}грн</b>
                            <b className={styles['cart__pay--price']}>{priceCart.toFixed(2)}грн</b>
                        </div>
                    ) : (
                        <b>{priceCart}грн</b>
                    )}
                </div>
                <div>
                    <h1>Налог 5%:</h1>
                    <b>{priceTax.toFixed(2)}грн</b>
                </div>
                <button onClick={buyCartSneakers}>
                    Оформити замовлення <img src='img/pointer_button.svg' alt='pointer' />
                </button>
            </div>
        </div>
    );
}

export default Cart;

Cart.propTypes = {
    items: PropTypes.array.isRequired,
    onRemove: PropTypes.func.isRequired,
    onCartEmpty: PropTypes.bool.isRequired,
    onCartHidden: PropTypes.func.isRequired,
    priceCart: PropTypes.number.isRequired,
    headerCart: PropTypes.string.isRequired,
    textCart: PropTypes.string.isRequired,
    imgUrlCart: PropTypes.string.isRequired,
    buyCartSneakers: PropTypes.func.isRequired,
    isManyActionCart: PropTypes.number.isRequired,
};
