import PropTypes from 'prop-types';
import { useState } from 'react';

function Card(props) {
    const [change, setChange] = useState(true);

    return (
        <div>
            <img
                src={change ? 'src/img/heart-shop_2.svg' : 'src/img/heart-shop_3.svg'}
                onClick={() => setChange(!change)}
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
                    <img src='src/img/plus.svg' alt='plus' />
                </div>
            </div>
        </div>
    );
}

Card.propTypes = {
    imgUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};

export default Card;
