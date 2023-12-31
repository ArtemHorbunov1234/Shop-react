import PropTypes from 'prop-types';
import { useState } from 'react';
import ContentLoader from 'react-content-loader';
import styles from './card.module.scss';

function Card({ id, imgUrl, name, price, onBuyCart, onFavorite, added = true, addedLike = true, loading = false }) {
    const [changeHeart, setChangeHeart] = useState(addedLike);
    const [changePlus, setChangePlus] = useState(added);
    const onClickPlus = () => {
        setChangePlus(!changePlus);
        onBuyCart({ id, imgUrl, name, price });
    };

    const onClickFavorite = () => {
        onFavorite({ id, imgUrl, name, price });
        setChangeHeart(!changeHeart);
    };

    return (
        <div>
            {loading ? (
                <div className={styles.card_skeleton}>
                    <ContentLoader
                        speed={2}
                        width={155}
                        height={218}
                        viewBox='0 0 155 265'
                        backgroundColor='#f3f3f3'
                        foregroundColor='#ecebeb'
                    >
                        <rect x='1' y='0' rx='10' ry='10' width='155' height='155' />
                        <rect x='0' y='167' rx='5' ry='5' width='155' height='15' />
                        <rect x='0' y='187' rx='5' ry='5' width='100' height='15' />
                        <rect x='1' y='234' rx='5' ry='5' width='80' height='25' />
                        <rect x='124' y='230' rx='10' ry='10' width='32' height='32' />
                    </ContentLoader>
                </div>
            ) : (
                <div className={styles.card}>
                    <div>
                        <img
                            className={styles['card__favorite--img']}
                            src={addedLike ? 'img/heart-shop_3.svg' : 'img/heart-shop_2.svg'}
                            onClick={onClickFavorite}
                            alt='heart'
                        />
                    </div>

                    <div>
                        <img className={styles['card__sneaker--img']} src={imgUrl} alt='sneaker' />
                        <div>
                            <h1>{name}</h1>
                        </div>
                        <div className={styles.card_button}>
                            <div>
                                <h1>Ціна:</h1>
                                <b>{price} грн</b>
                            </div>
                            <div>
                                <img src={added ? 'img/tick.svg' : 'img/plus.svg'} alt='plus' onClick={onClickPlus} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

Card.propTypes = {
    imgUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    onBuyCart: PropTypes.func.isRequired, // ожидаем функцию-обработчик
    onFavorite: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    added: PropTypes.bool.isRequired,
    addedLike: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
};
export default Card;
