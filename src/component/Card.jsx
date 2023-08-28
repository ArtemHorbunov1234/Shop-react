import PropTypes from 'prop-types';
import { useState } from 'react';

function Card({ id, imgUrl, name, price, onBuyCart, onFavorite, added = true }) {
    const [changeHeart, setChangeHeart] = useState(true);
    const [changePlus, setChangePlus] = useState(added);
    const onClickPlus = () => {
        setChangePlus(!changePlus);
        onBuyCart({ id, imgUrl, name, price });
    };

    const onClickFavorite = () => {
        onFavorite({ imgUrl, name, price });
        setChangeHeart(!changeHeart);
    };

    return (
        <div>
            <div>
                <img
                    className='card__favorite--img'
                    src={changeHeart ? 'src/img/heart-shop_2.svg' : 'src/img/heart-shop_3.svg'}
                    onClick={onClickFavorite}
                    alt='heart'
                />
            </div>

            <div>
                <img src={imgUrl} alt='sneaker' />
                <div>
                    <h1>{name}</h1>
                </div>
                <div className='section_button'>
                    <div>
                        <h1>Ціна:</h1>
                        <b>{price} грн</b>
                    </div>
                    <div>
                        <img src={added ? 'src/img/tick.svg' : 'src/img/plus.svg'} alt='plus' onClick={onClickPlus} />
                    </div>
                </div>
            </div>
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
};
export default Card;
