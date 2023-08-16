function Navigation() {
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
                        <img src='src/img/cart-shop.svg' alt='' />
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

export default Navigation;
