import styles from '../styles/home.module.css';
import AddHabitForm from './AddHabitForm';
import { Link } from 'react-router-dom';
import { onSnapshot, collection, addDoc, getDoc, setDoc, doc } from 'firebase/firestore';
import {db} from '../firebaseInit';
import { useEffect } from 'react';
import { actions, habitSelector } from '../redux/reducers/habitReducer';
import { useDispatch, useSelector } from 'react-redux';

function Home(){
    const dispatch = useDispatch();
    const habits = useSelector(habitSelector);
    function handleClickOnStatus(id, stat){
        const payLoad = {id, stat};
        dispatch(actions.changeStatus(payLoad))
    }
    useEffect(()=>{
        // fetching all the data to show in UI
        const allHabitsData = onSnapshot(collection(db, "habits"),(snapShot)=>{
            const allHabits = snapShot.docs.map((doc)=>{
                return{
                    id: doc.id,
                    ...doc.data()
                }
            })
            dispatch(actions.changeHabits(allHabits));
        })

        // checking for new Date
    },[])

    return(
        <div className={styles.mainContainer}>
        {/* heading */}
        <div className={styles.Heading}>Habit Tracking App</div>
        <AddHabitForm/>
        {/* Habbit list */}
        <div className={styles.habitList}>
            {habits.map((item, index)=>{
                return(
                    <div className={styles.habit} key={index}> 
                        <div className={styles.habitName}>
                            <div>{item.nameOfHabit}</div>
                            <div style={{fontSize: "1rem", border:"1px solid black", padding:"1px", marginTop:"3px"}}>{item.createdOn}</div>
                        </div>
                        
                        {item.status==='done'?
                            <div className={styles.status}>
                                <img src="https://www.svgrepo.com/show/361417/check-circled.svg" alt="done" className={styles.icnClas} onClick={()=>handleClickOnStatus(item.id, 'done')} style={{background: "green"}}/>
                                <img src="https://www.svgrepo.com/show/361454/cross-circled.svg" alt="not-done" className={styles.icnClas} onClick={()=>handleClickOnStatus(item.id, 'not-done')}/>
                                <img src="https://www.svgrepo.com/show/361426/circle-backslash.svg" alt="no-attempt" className={styles.icnClas} onClick={()=>handleClickOnStatus(item.id, 'none')}/>
                            </div>:
                            item.status==='not-done'?
                            <div className={styles.status}>
                                <img src="https://www.svgrepo.com/show/361417/check-circled.svg" alt="done" className={styles.icnClas} onClick={()=>handleClickOnStatus(item.id, 'done')}/>
                                <img src="https://www.svgrepo.com/show/361454/cross-circled.svg" alt="not-done" className={styles.icnClas} onClick={()=>handleClickOnStatus(item.id, 'not-done')} style={{background: "red"}}/>
                                <img src="https://www.svgrepo.com/show/361426/circle-backslash.svg" alt="no-attempt" className={styles.icnClas} onClick={()=>handleClickOnStatus(item.id, 'none')}/>
                            </div>:
                            item.status==='none'?
                            <div className={styles.status}>
                             <img src="https://www.svgrepo.com/show/361417/check-circled.svg" alt="done" className={styles.icnClas} onClick={()=>handleClickOnStatus(item.id, 'done')}/>
                             <img src="https://www.svgrepo.com/show/361454/cross-circled.svg" alt="not-done" className={styles.icnClas} onClick={()=>handleClickOnStatus(item.id, 'not-done')}/>
                             <img src="https://www.svgrepo.com/show/361426/circle-backslash.svg" alt="no-attempt" className={styles.icnClas} onClick={()=>handleClickOnStatus(item.id, 'none')} style={{background: "yellow"}}/>
                            </div>:
                            <div className={styles.status}>
                            <img src="https://www.svgrepo.com/show/361417/check-circled.svg" alt="done" className={styles.icnClas} onClick={()=>handleClickOnStatus(item.id, 'done')}/>
                            <img src="https://www.svgrepo.com/show/361454/cross-circled.svg" alt="not-done" className={styles.icnClas} onClick={()=>handleClickOnStatus(item.id, 'not-done')}/>
                            <img src="https://www.svgrepo.com/show/361426/circle-backslash.svg" alt="no-attempt" className={styles.icnClas} onClick={()=>handleClickOnStatus(item.id, 'none')}/>
                           </div>
                        }

                        <div className={styles.sevenDaysStatus}>
                            <Link to={`/status/${item.id}`}>
                                <button className={styles.showBtn}>
                                    last 7 days
                                </button>
                            </Link>
                        </div>
                    </div>
                )
            })}
        </div>        
    </div>
    )
}

export default Home;