import React, { useEffect, useState } from 'react';
import iconMinus from '../../assets/images/minus-solid.svg';
import iconPlus from '../../assets/images/plus-solid.svg';
import './ItemQuantity.scss';

interface IItemQuantity {
  quantity: number;
  itemsAvailable?: number;
  handleChange: (value: number) => void;
  handleItemDelete?: () => void;
}
export const ItemQuantity = ({ quantity, itemsAvailable, handleChange, handleItemDelete=() => {} }: IItemQuantity) => {
  const [quantityValue, setQualtityValue] = useState(quantity);

  const changeQuantity = (value: number) => {
    const result = quantityValue + value;

    if (result < 1) {
      handleItemDelete();
      return;
    }
    if (itemsAvailable && result > itemsAvailable) return;

    setQualtityValue(result);
    handleChange(result);
  };

  useEffect(() => {
    setQualtityValue(quantity);
  }, [quantity])

  return (
    <div className='quantity d-flex'>
      <button onClick={() => changeQuantity(-1)} className='quantity-btn d-flex'>
        <img alt="minus-item" src={iconMinus} />
      </button>
      <div className='quantity-value d-flex'>{quantityValue}</div>

      <button onClick={() => changeQuantity(1)} className='quantity-btn d-flex'>
        <img alt="plus-item" src={iconPlus} />
      </button>
    </div>
  );
};
