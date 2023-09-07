import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './favorite.module.scss';

function Favorite({ favorite, onRemoveFavorite }) {
    return (
        <>
            {favorite.length > 0 ? (
                <div>
                    <div className={styles.favorite}>
                        <Link to='/Shop-react'>
                            <img src='img/exit_favorite.svg' alt='exit' />
                        </Link>
                        <h1>Мої закладки</h1>
                    </div>
                    <div className={styles.favorite__item}>
                        {favorite.map((obj, index) => (
                            <div className={styles['favorite--item']} key={index}>
                                <img
                                    className={styles['favorite--item__img']}
                                    onClick={() => onRemoveFavorite(obj.id)}
                                    src='img/heart-shop_3.svg'
                                    alt=''
                                />
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
                <div className={styles['favorite--item__dont']}>
                    <img src='img/smile_favorite.svg' alt='smile' />
                    <h1>Закладок немає :(</h1>
                    <p>Ви нічого не додавали в закладки</p>
                    <Link to='/Shop-react'>
                        <button>
                            <img src='img/cursor_left-button.svg' alt='' />
                            Повернутися назад
                        </button>
                    </Link>
                </div>
            )}
        </>
    );
}

Favorite.propTypes = {
    favorite: PropTypes.array.isRequired,
    onRemoveFavorite: PropTypes.func.isRequired,
};

export default Favorite;
