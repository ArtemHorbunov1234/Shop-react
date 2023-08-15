function Navigation() {
    return (
        <nav className='navigation'>
            <ul>
                <li>
                    <li>
                        <img src='src/img/logo-shop.svg' alt='' />
                    </li>
                    <li>
                        <h1>REACT SNEAKERS</h1>
                        <p>Магазин найкращих кросівок</p>
                    </li>
                </li>
                <li>
                    <li>
                        <img src='src/img/cart-shop.svg' alt='' />
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

function App() {
    return (
        <div>
            <Navigation />
        </div>
    );
}

export default App;
