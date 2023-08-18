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

            <div>
                <h1></h1>
            </div>
        </div>
    );
}

export default CartShop;

CartShop.propTypes = {
    items: PropTypes.array.isRequired,
};
