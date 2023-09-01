import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function Order({ order, setOrders }) {
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('https://60d62397943aa60017768e77.mockapi.io/Order');
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
            } catch (error) {
                console.log(order);

                alert('Ошибка при запросе заказов');
                console.error(error);
            }
        })();
    }, []);
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
                                    <img src={obj.imgUrl} alt='sneaker' />
                                </div>
                                <h1>{obj.name}</h1>

                                <div>
                                    <b>Цена:</b>
                                    <h3>{obj.price} грн</h3>
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
    setOrders: PropTypes.func.isRequired,
};

export default Order;
