import React from 'react';
import './Main.css'
import { useSelector, useDispatch } from 'react-redux';
import BoughtPlaces from '../BoughtPlaces/BoughtPlaces';
import { setPlaceBuy, setPlaceNoBuy, setPlacesHall, setPlacesHallBack } from '../redux/slices/placesHallSlice';



const Main = () => {

  const dispatch = useDispatch();

  let arrObjectsPlaceHallMain = useSelector(state => state.placesHallSlice.arrObjectsPlaceHall);

  // функция для Redux Toolkit - получает id выбранного места, т.е. определяет данные "action.payload" для функций reducers из placesHallSlice и запускает их в зависимости от условий
  const toBuyTicket = async (e) => {
    const target = e.target;
    // console.log('target: ', target);

    if (target.dataset.mark === '_place') {

      if (target.className === 'free') {

        localStorage.setItem(target.id, 'freeze');

        dispatch(setPlacesHall({
          myClassName: target.className,
          id: target.id,
        }));

        dispatch(setPlaceBuy({
          myClassName: target.className,
          id: target.id,
        }));

      } else {

        localStorage.removeItem(target.id);

        dispatch(setPlaceNoBuy({
          myClassName: target.className,
          id: target.id
        }));

        dispatch(setPlacesHallBack({
          myClassName: target.className,
          id: target.id,
        }))

      }
    }

  };

  // функция получает данные если их нет подставляет дефолтные // больше не нужна
  // const getLockalStor = (data, dataDefault) => {
  //   if (data) {
  //     return data
  //   } else { return dataDefault }
  // };


  return (

    <div className="main">

      <ul className="section__hall_content" onClick={toBuyTicket}>

        {arrObjectsPlaceHallMain.map((itemArr, indexArr) => (

          <li className='row' key={'row' + (indexArr + 1)}>

            <p>{indexArr + 1} ряд</p>

            <ul className='places'>

              {Object.entries(itemArr).map((elem, index) => (
                <li
                  className={elem[1]}
                  id={elem[0]}
                  key={`place_${elem[0]}`}
                  data-mark='_place'
                >{index + 1}</li>
              ))}

            </ul>

          </li>

        ))}

      </ul>

      <BoughtPlaces />

    </div>

  );

};

export default Main;


