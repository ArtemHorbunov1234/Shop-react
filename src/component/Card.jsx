import PropTypes from 'prop-types';
import { useState } from 'react';

function Card(props) {
    const [changeHeart, setChangeHeart] = useState(true);
    const [changePlus, setChangePlus] = useState(true);

    return (
        <div>
            <img
                src={changeHeart ? 'src/img/heart-shop_2.svg' : 'src/img/heart-shop_3.svg'}
                onClick={() => setChangeHeart(!changeHeart)}
                alt='heart'
            />
            <div>
                <img src={props.imgUrl} alt='sneaker' />
                <div>
                    <h1>{props.name}</h1>
                </div>
                <div className='section_button'>
                    <div>
                        <h1>Ціна:</h1>
                        <b>{props.price} грн</b>
                    </div>
                    <div onClick={() => setChangePlus(!changePlus)}>
                        <img
                            src={changePlus ? 'src/img/plus.svg' : 'src/img/tick.svg'}
                            alt='plus'
                            onClick={props.onClickCart}
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
    onClickCart: PropTypes.bool.isRequired,
};

export default Card;
