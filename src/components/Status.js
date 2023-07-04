import styles from '../styles/status.module.css';
import { useParams, Link } from 'react-router-dom';
import {db} from '../firebaseInit';
import { onSnapshot, collection } from 'firebase/firestore';
import { useEffect } from 'react';
import { actions, habitSelector } from '../redux/reducers/habitReducer';
import { useDispatch, useSelector } from 'react-redux';

function Status(){
    const dispatch = useDispatch();
    let id = useParams().id;
    let habits = useSelector(habitSelector);

    function handleClickOnStatus(id, stat){
        const payLoad = {id, stat};
        dispatch(actions.changeStatus(payLoad))
    }

    function handleClickOnLastStatus(id1, stat, index){
        let payLoad = {id1, stat, index};
        dispatch(actions.changeLastDaysStat(payLoad));
    }

    useEffect(()=>{
        const habitsData = onSnapshot(collection(db, "habits"),(snapShot)=>{
            const allHabits = snapShot.docs.map((doc)=>{
                return{
                    id: doc.id,
                    ...doc.data()
                }
            })
            dispatch(actions.changeHabits(allHabits));
        })
    },[])
    return(
        <>
            <div className={styles.Heading}>
                <div className={styles.homeBtn}>
                <Link to='/'>
                    <button>
                        <img src='https://www.svgrepo.com/show/510001/home.svg' alt='homeButton'/>
                    </button>
                </Link>
                </div>
                <div className={styles.headingText}>
                    Status of last seven days
                </div>
            </div>
            {
                habits.map((item, index)=>{
                    if(item.id === id){
                        return(
                        <div className={styles.statusContainer} key={index}>
                            <div className={styles.day}>
                                <div className={styles.nameOfDay}>
                                    {item.nameOfHabit}: Today
                                </div>
                                {/* TOday's Status */}
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
                            </div>
                            {/* last 6 day's status */}
                            {item.lastStats?item.lastStats.map((stat, index)=>{
                                return(
                                    <div className={styles.day} key={index}>
                                        <div className={styles.nameOfDay}>
                                            {item.nameOfHabit}:{index+2+" day"}
                                        </div>
                                        {
                                            stat==='done'?
                                            <div className={styles.status}>
                                                <img src="https://www.svgrepo.com/show/361417/check-circled.svg" alt="done" className={styles.icnClas} onClick={()=>handleClickOnLastStatus(item.id, 'done', index)} style={{background: "green"}}/>
                                                <img src="https://www.svgrepo.com/show/361454/cross-circled.svg" alt="not-done" className={styles.icnClas} onClick={()=>handleClickOnLastStatus(item.id, 'not-done', index)}/>
                                                <img src="https://www.svgrepo.com/show/361426/circle-backslash.svg" alt="no-attempt" className={styles.icnClas} onClick={()=>handleClickOnLastStatus(item.id, 'none', index)}/>
                                            </div>:
                                            stat==='not-done'?
                                            <div className={styles.status}>
                                                <img src="https://www.svgrepo.com/show/361417/check-circled.svg" alt="done" className={styles.icnClas} onClick={()=>handleClickOnLastStatus(item.id, 'done', index)}/>
                                                <img src="https://www.svgrepo.com/show/361454/cross-circled.svg" alt="not-done" className={styles.icnClas} onClick={()=>handleClickOnLastStatus(item.id, 'not-done', index)} style={{background: "red"}}/>
                                                <img src="https://www.svgrepo.com/show/361426/circle-backslash.svg" alt="no-attempt" className={styles.icnClas} onClick={()=>handleClickOnLastStatus(item.id, 'none', index)}/>
                                            </div>:
                                            stat==='none'?
                                            <div className={styles.status}>
                                            <img src="https://www.svgrepo.com/show/361417/check-circled.svg" alt="done" className={styles.icnClas} onClick={()=>handleClickOnLastStatus(item.id, 'done', index)}/>
                                            <img src="https://www.svgrepo.com/show/361454/cross-circled.svg" alt="not-done" className={styles.icnClas} onClick={()=>handleClickOnLastStatus(item.id, 'not-done', index)}/>
                                            <img src="https://www.svgrepo.com/show/361426/circle-backslash.svg" alt="no-attempt" className={styles.icnClas} onClick={()=>handleClickOnLastStatus(item.id, 'none', index)} style={{background: "yellow"}}/>
                                            </div>:
                                            <div className={styles.status}>
                                            <img src="https://www.svgrepo.com/show/361417/check-circled.svg" alt="done" className={styles.icnClas} onClick={()=>handleClickOnLastStatus(item.id, 'done', index)}/>
                                            <img src="https://www.svgrepo.com/show/361454/cross-circled.svg" alt="not-done" className={styles.icnClas} onClick={()=>handleClickOnLastStatus(item.id, 'not-done', index)}/>
                                            <img src="https://www.svgrepo.com/show/361426/circle-backslash.svg" alt="no-attempt" className={styles.icnClas} onClick={()=>handleClickOnLastStatus(item.id, 'none', index)}/>
                                            </div>
                                        }
                                    </div>)
                            }):null}
                            
                        </div>)
                    }
                })
            }
        </>
    )
}

export default Status;