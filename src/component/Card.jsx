import PropTypes from 'prop-types';
import { useState } from 'react';

function Card({ imgUrl, name, price, onBuyCart }) {
    const [changeHeart, setChangeHeart] = useState(true);
    const [changePlus, setChangePlus] = useState(true);
    const onClickPlus = () => {
        setChangePlus(!changePlus);
        onBuyCart({ imgUrl, name, price });
    };

    return (
        <div>
            <img
                src={changeHeart ? 'src/img/heart-shop_2.svg' : 'src/img/heart-shop_3.svg'}
                onClick={() => setChangeHeart(!changeHeart)}
                alt='heart'
            />
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
                    <div onClick={onClickPlus}>
                        <img
                            src={changePlus ? 'src/img/plus.svg' : 'src/img/tick.svg'}
                            alt='plus'
                            onClick={onBuyCart}
                        />
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
    onClickCart: PropTypes.func.isRequired, // ожидаем функцию-обработчик
    onBuyCart: PropTypes.func.isRequired, // ожидаем функцию-обработчик
};
export default Card;
