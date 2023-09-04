import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

function Navigation({ cartChange, onHeard, onFavorite, onCart, priceCart }) {
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
                    <img
                        src={cartChange.length > 0 ? 'src/img/cart_blue.svg' : 'src/img/cart-shop.svg'}
                        onClick={onCart}
                        alt=''
                    />
                    <div>
                        <h1>{priceCart}грн</h1>
                    </div>
                </li>
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
    cartChange: PropTypes.array.isRequired,
    priceCart: PropTypes.number.isRequired,
};

export default Navigation;
