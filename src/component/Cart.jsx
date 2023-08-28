import PropTypes from 'prop-types';

function Cart({ onCartHidden, onCartEmpty, onRemove, items = [], priceCart }) {
    let priceTax = (priceCart / 100) * 5;
    return (
        <div className='cart'>
            <div className='cart__buy'>
                <div>
                    <div className='cart__header'>
                        <h1>Кошик</h1>
                        <img onClick={onCartHidden} src='src/img/cart_x--letter.svg' alt='' />
                    </div>

                    <div className={onCartEmpty ? 'Cart__empty' : 'Cart__empty--none'}>
                        <div>
                            <img src='src/img/cart.svg' alt='cart' />
                        </div>
                        <div>
                            <h1>Кошик порожній</h1>
                        </div>
                        <div>
                            <p>Додайте хоча б одну пару кросівок, щоб зробити замовлення.</p>
                        </div>
                        <div>
                            <button onClick={onCartHidden}>
                                <img src='src/img/cursor_left-button.svg' alt='' />
                                Повернутися назад
                            </button>
                        </div>
                    </div>
                    {items.map((obj) => (
                        <div className='cart__buy--item' key={obj.id}>
                            <div>
                                <img src={obj.imgUrl} alt='sneaker' />
                            </div>

                            <div>
                                <h1>{obj.name}</h1>
                                <b>{obj.price} грн</b>
                            </div>
                            <img
                                onClick={() => {
                                    onRemove(obj.id);
                                }}
                                src='src/img/delete-icon.svg'
                                alt='delete-icon'
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className={onCartEmpty ? 'Cart__empty--none' : 'cart__pay'}>
                <div>
                    <h1>Разом:</h1>
                    <b>{priceCart}грн</b>
                </div>
                <div>
                    <h1>Налог 5%:</h1>
                    <b>{priceTax.toFixed(2)}грн</b>
                </div>
                <button>
                    Оформити замовлення <img src='src/img/pointer_button.svg' alt='pointer' />
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
};
