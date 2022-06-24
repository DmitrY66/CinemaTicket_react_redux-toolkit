import React from 'react';
import './BoughtPlaces.css'
import { useSelector } from 'react-redux';


const BoughtPlaces = () => {

  let arrayPlacesBuyed = useSelector(state => state.placesHallSlice.arrayOfBuyed);
  // console.log('arrayPlacesBuyed: ', arrayPlacesBuyed);

  // функция сортирует массив купленных билетов
  const sortingArrayPlacesBuyed = () => {

    let arrayPlacesBuyedCopy = [...arrayPlacesBuyed];
    let temp = {};

    for (let i = 0; i < arrayPlacesBuyedCopy.length; i++) {
      for (let j = i + 1; j < arrayPlacesBuyedCopy.length; j++) {
        if (arrayPlacesBuyedCopy[i].id > arrayPlacesBuyedCopy[j].id) {

          temp = arrayPlacesBuyedCopy[i]
          arrayPlacesBuyedCopy[i] = arrayPlacesBuyedCopy[j]
          arrayPlacesBuyedCopy[j] = temp

        }
      }
    }

    arrayPlacesBuyed = arrayPlacesBuyedCopy;

  }

  sortingArrayPlacesBuyed();


  return (

    <div className="boughtPlaces">

      <h2 className="boughtPlaces__title">Купленные места</h2>

      <ul className="boughtPlaces__content">

        {arrayPlacesBuyed.map((item, indexBuyed) => (

          <li
            className={arrayPlacesBuyed[indexBuyed].myClassName}
            id={`placeBuyed_${arrayPlacesBuyed[indexBuyed].id}`}
            key={`placeBuyed_${indexBuyed + 1}`}
            data-mark='_place'
          >
            {
              [...arrayPlacesBuyed[indexBuyed].id].map((el, index) => {
                if (index === arrayPlacesBuyed[indexBuyed].id.length - 1) {
                  el = +el + 1;
                }
                return el;
              }).join('')
            }
          </li>

        ))}

      </ul>

    </div>

  );

};

export default BoughtPlaces;