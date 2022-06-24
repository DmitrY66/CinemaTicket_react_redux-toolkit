import { createSlice } from '@reduxjs/toolkit';


// =======================================================
// преобразуем массив localStorage в массив объектов arrayLocalStorage для начального состояния
// console.log(localStorage);
const arrayLocalStorage = [];
let objLoc = {};

Object.entries(localStorage).forEach((item) => {
  objLoc["myClassName"] = item[1];
  objLoc["id"] = item[0];
  arrayLocalStorage.push(objLoc);
  objLoc = {};
})
// =======================================================

// создаем массив с объектами рядов с местами и их статусом для initialState && подставив значения из localStorage если они есть
export const createArrayPlacesHall = (simparr, arr, obj, value) => {


  simparr.forEach((myRow) => {
    simparr.forEach((myPlace, index) => {

      obj[`${myRow}_${index}`] = value;

    });

    Object.entries(obj).forEach(elem => {
      Object.entries(localStorage).forEach(item => {
        if (elem[0] === item[0]) {
          
          obj[elem[0]] = item[1];

        }
      });
    });

    arr.push(obj);
    obj = {};

  });

  return arr;

};
// =======================================================

const simpleArray = Array(10).fill(0).map((e, i) => i + 1);
export let arrObjectsPlaceHall = [];
let objPlacesHall = {};

const myFree = 'free';
const myFreeze = 'freeze';

createArrayPlacesHall(simpleArray, arrObjectsPlaceHall, objPlacesHall, myFree);
// console.log('arrObjectsPlaceHall: ', arrObjectsPlaceHall);


const initialState = {

  arrayOfBuyed: [...arrayLocalStorage],

  arrObjectsPlaceHall: arrObjectsPlaceHall

};



export const placesHallSlice = createSlice({

  name: 'placesHallSlice',

  initialState,

  reducers: {


    setPlaceBuy(state, action) {
      state.arrayOfBuyed.push(action.payload);
      // console.log('action.payload: ', action.payload);
    },


    setPlaceNoBuy(state, action) {
      state.arrayOfBuyed = state.arrayOfBuyed.filter(function (e) { return e.id !== action.payload.id });
      // console.log('state.arrayOfBuyed: ', ...state.arrayOfBuyed);
    },


    setPlacesHall(state, action) {

      state.arrObjectsPlaceHall.map((item, index) => {

        Object.keys(item).forEach(elem => {
          if (elem === action.payload.id) {
            item[elem] = myFreeze
          }
        })

        return state.arrObjectsPlaceHall
      });

    },

    setPlacesHallBack(state, action) {

      state.arrObjectsPlaceHall.map((item, index) => {

        Object.keys(item).forEach(elem => {
          if (elem === action.payload.id) {

            item[elem] = myFree
            
          }
        })

        return state.arrObjectsPlaceHall
      });

    }

  } // reducers

});


export const {
  setPlaceBuy,
  setPlaceNoBuy,
  setPlacesHall,
  setPlacesHallBack
} = placesHallSlice.actions;

export default placesHallSlice.reducer;



