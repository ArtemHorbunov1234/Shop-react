import PropTypes from 'prop-types';

function CartShop({ items = [] }) {
    return (
        <div className='cart'>
            <div className='cart__buy'>
                <div>
                    <h1>Кошик</h1>
                    {items.map((obj, index) => (
                        <div key={index}>
                            <div>
                                <img src={obj.imgUrl} alt='sneaker' />
                            </div>

                            <div>
                                <h1>{obj.name}</h1>
                                <b>{obj.price} грн</b>
                            </div>
                            <img src='src/img/delete-icon.svg' alt='delete-icon' />
                        </div>
                    ))}
                </div>
            </div>

            <div className='cart__pay'>
                <div>
                    <h1>Разом:</h1>
                    <b>3 600грн</b>
                </div>
                <div>
                    <h1>Налог 5%:</h1>
                    <b>50грн</b>
                </div>
                <button>
                    Оформити замовлення <img src='src/img/pointer_button.svg' alt='pointer' />
                </button>
            </div>
        </div>
    );
}

export default CartShop;

CartShop.propTypes = {
    items: PropTypes.array.isRequired,
};
