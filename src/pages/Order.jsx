import PropTypes from 'prop-types';
// import axios from 'axios';
import { Link } from 'react-router-dom';

function Order({ order }) {
    console.log(order);
    return (
        <>
            {order.length > 0 ? (
                <div>
                    <div className='favorite'>
                        <Link to='/'>
                            <img src='src/img/exit_favorite.svg' alt='exit' />
                        </Link>
                        <h1>Мої покупки</h1>
                    </div>
                    <div className='favorite__item'>
                        {order.map((obj, index) => (
                            <div className='favorite--item' key={index}>
                                <img className='favorite--item__img' src='src/img/heart-shop_3.svg' alt='' />
                                <div>
                                    {obj.items.map((item, itemIndex) => (
                                        <div key={itemIndex}>
                                            <img src={item.imgUrl} alt='sneaker' />
                                            <h1>{item.id.name}</h1>
                                            <div>
                                                <b>Цена:</b>
                                                <h3>{item.price} грн</h3>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className='favorite--item__dont'>
                    <img src='src/img/smile_favorite.svg' alt='smile' />
                    <h1>У вас немає замовлень:(</h1>
                    <p>Ви нічого не придбали </p>
                    <Link to='/'>
                        <button>
                            <img src='src/img/cursor_left-button.svg' alt='' />
                            Повернутися назад
                        </button>
                    </Link>
                </div>
            )}
        </>
    );
}

Order.propTypes = {
    order: PropTypes.array.isRequired,
};

export default Order;
