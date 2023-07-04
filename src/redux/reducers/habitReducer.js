import { createSlice } from "@reduxjs/toolkit";
import {db} from '../../firebaseInit';
import { collection, addDoc, setDoc, doc, query, where, getDoc, getDocs, Timestamp } from "firebase/firestore"; 

const initialState={
    habits:[]
}

const habitSlice = createSlice({
    name:"habits",
    initialState,
    reducers:{
        addNewHabit: (state, action)=>{
            const tempArray =['','','','','',''];
            const addNewHab=async()=>{
                await addDoc(collection(db, "habits"),{
                    nameOfHabit: action.payload,
                    status:"",
                    lastStats: tempArray,
                    createdOn: new Date().toDateString()
                });
            }
            addNewHab();
        },

        changeStatus:(state, action)=>{
            const handleClickStatus=async ()=>{
                const toBeChanged = await getDoc(doc(db, "habits", action.payload.id));
                const myData = toBeChanged.data();

                // Difference Between today's date and the date associated with the last status
                let todaysDate = new Date();
                let compairedToBe = new Date(myData.createdOn);
                let todaysDateUTC = Date.UTC(todaysDate.getFullYear(), todaysDate.getMonth(), todaysDate.getDate());
                let compairedToBeUTC = Date.UTC(compairedToBe.getFullYear(), compairedToBe.getMonth(), compairedToBe.getDate());
                let differenceBetweenDates = Math.floor(todaysDateUTC-compairedToBeUTC)/(1000 * 60 * 60 * 24);

                // changing today's status, if it is created today or it's status was changed today
                if(differenceBetweenDates === 0){
                    if(action.payload.stat !== myData.status){
                        myData.status = action.payload.stat;
                        setDoc(doc(db, "habits", action.payload.id),{
                            ...myData
                        });
                    }
                }

                // adding fresh status for a new day and updating the lastStats array
                else{
                    let tempStatsArray = [...myData.lastStats];
                    if(differenceBetweenDates<=6){
                        if(differenceBetweenDates>1){
                            tempStatsArray[differenceBetweenDates-1] = myData.status;
                            for(let i= 0; i<differenceBetweenDates-1; i++){
                                tempStatsArray[i] = '';
                            }
                        }else{
                            tempStatsArray[0] = myData.status;
                        }
                    }else{
                        for(let i= 0; i<tempStatsArray.length; i++){
                            tempStatsArray[i]='';
                        }
                    }
                    // setting up the habit with latest status and lastStats array
                    setDoc(doc(db, "habits", action.payload.id),{
                        ...myData,
                        lastStats: [...tempStatsArray],
                        status: action.payload.stat,
                        createdOn: new Date().toDateString()
                    });
                }
            }
            handleClickStatus();
        },

        changeLastDaysStat:(state, action)=>{
            const handleClickLastStatus=async()=>{
                const docRef = doc(db, 'habits', action.payload.id1);
                const docSnap = await getDoc(docRef);
                const newData = docSnap.data();
                newData.lastStats[action.payload.index] = action.payload.stat;
                await setDoc(doc(db, 'habits', action.payload.id1),{
                    ...newData
                })
            }
            handleClickLastStatus();
        },

        changeHabits:(state, action)=>{
            state.habits = action.payload;
        }

    }
})

export const habitReducer = habitSlice.reducer;
export const actions = habitSlice.actions;
export const habitSelector = (state)=>state.habitReducer.habits;