import PropTypes from 'prop-types';

function Navigation(props) {
    return (
        <nav className='navigation'>
            <ul>
                <li className='headerLeft'>
                    <li>
                        <img src='src/img/logo-shop.svg' alt='' />
                    </li>
                    <li>
                        <h1>REACT SNEAKERS</h1>
                        <p>Магазин найкращих кросівок</p>
                    </li>
                </li>
                <li className='headerRight'>
                    <li>
                        <img src='src/img/cart-shop.svg' onClick={props.onCart} alt='' />
                        <ul>
                            <li></li>
                        </ul>
                        <h1>1000$</h1>
                    </li>
                    <li>
                        <img src='src/img/heart-shop.svg' alt='heart' />
                        <img src='src/img/account-shop.svg' alt='account' />
                    </li>
                </li>
            </ul>
        </nav>
    );
}

Navigation.propTypes = {
    onCart: PropTypes.string.isRequired,
};

export default Navigation;
