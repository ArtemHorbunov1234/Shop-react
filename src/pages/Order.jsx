import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './order.module.scss';

function Order({ order }) {
    return (
        <>
            {order.length > 0 ? (
                <div>
                    <div className={styles.order_header}>
                        <Link to='/'>
                            <img src='src/img/exit_favorite.svg' alt='exit' />
                        </Link>
                        <h1>Мої покупки</h1>
                    </div>
                    <div className={styles.order}>
                        {order.map((orderItem) => (
                            <div className={styles.order__item} key={orderItem.id}>
                                <h2>Заказ #{orderItem.id}</h2>

                                {orderItem.cartItems.map((item) => (
                                    <div className={styles.item} key={item.id}>
                                        <div>
                                            <img src={item.imgUrl} alt='sneaker' />
                                        </div>
                                        <h1>{item.name}</h1>

                                        <div>
                                            <b>Цена:</b>
                                            <h3>{item.price} грн</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className={styles['order--item__dont']}>
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
