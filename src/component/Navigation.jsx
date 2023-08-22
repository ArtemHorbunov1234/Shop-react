import PropTypes from 'prop-types';

function Navigation({ onFavorite, onCart }) {
    return (
        <nav className='navigation'>
            <ul className='headerLeft'>
                <li>
                    <img src='src/img/logo-shop.svg' alt='' />
                </li>
                <li>
                    <h1>REACT SNEAKERS</h1>
                    <p>Магазин найкращих кросівок</p>
                </li>
            </ul>
            <ul className='headerRight'>
                <li>
                    <img src='src/img/cart-shop.svg' onClick={onCart} alt='' />
                    <div>
                        <ul>
                            <li></li>
                        </ul>
                        <h1>1000$</h1>
                    </div>
                </li>
                <li>
                    <img src='src/img/heart-shop.svg' onClick={onFavorite} alt='heart' />
                    <img src='src/img/account-shop.svg' alt='account' />
                </li>
            </ul>
        </nav>
    );
}

Navigation.propTypes = {
    onCart: PropTypes.func.isRequired,
    onFavorite: PropTypes.bool.isRequired,
};

export default Navigation;
