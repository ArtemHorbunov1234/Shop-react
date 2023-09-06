import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import gifPrice from '../img/price.gif';
import gifCart from '../img/cart-new.gif';

function Navigation({ onHeard, onFavorite, onCart, priceCart, manyCart }) {
    return (
        <nav className='navigation'>
            <Link to='/'>
                <ul className='headerLeft'>
                    <li>
                        <img src='src/img/logo--new.png' width={45} height={45} alt='' />
                    </li>
                    <li>
                        <h1 className='headerLeft__text--logo'>REACT SNEAKERS</h1>
                        <p>Магазин найкращих кросівок</p>
                    </li>
                </ul>
            </Link>

            <ul className='headerRight'>
                <li>
                    <img src={gifCart} onClick={onCart} alt='' />
                    <div>
                        <h1 onClick={onCart}>
                            {priceCart > 0 ? (
                                `${priceCart}грн`
                            ) : (
                                <img src={gifPrice} width={30} height={30} alt='Cart' />
                            )}
                        </h1>
                    </div>
                </li>
                <h1 onClick={onCart} className='many__cart'>
                    {manyCart}
                </h1>
                <li>
                    <Link to='/favorite'>
                        <img
                            src={onHeard.length > 0 ? 'src/img/favorite_navigation_1.svg' : 'src/img/heart-shop.svg'}
                            width={25}
                            height={25}
                            onClick={onFavorite}
                            alt='heart'
                        />
                    </Link>
                    <Link to='/order'>
                        <img src='src/img/account-shop.svg' alt='account' />
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

Navigation.propTypes = {
    onCart: PropTypes.func.isRequired,
    onFavorite: PropTypes.func.isRequired,
    onHeard: PropTypes.array.isRequired,
    priceCart: PropTypes.number.isRequired,
    manyCart: PropTypes.number.isRequired,
};

export default Navigation;
