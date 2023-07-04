import styles from '../styles/addHabitForm.module.css';
import { useState } from 'react';
import { actions } from '../redux/reducers/habitReducer';
import { useDispatch, useSelector } from 'react-redux';

function AddHabitForm(){
    const [tempHabit, setTempHabit] = useState('');
    const dispatch = useDispatch();
    function handleAddHabit(){
        dispatch(actions.addNewHabit(tempHabit));
        setTempHabit("");
    }
    return(
        <div className={styles.addHabitForm}>
            <input type="text" value={tempHabit} className={styles.nameOfHabitInput} name='habitName' onChange={(e)=>setTempHabit(e.target.value)}/>
            <button className={styles.addBtn} onClick={handleAddHabit}>Add</button>
        </div>
    )
}
export default AddHabitForm;