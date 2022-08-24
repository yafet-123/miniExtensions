import {useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import styles from '../../styles/Home.module.css'
import {login, logout, selectUser,selectClass} from "../Form/userSlice";

const DataDisplay = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const classes = useSelector(selectClass);
    const logoutButton = () => {
        dispatch(logout());
    };
    return (
        <div className={styles.home}>
            <div className={styles.Header}>
                <span className={styles.HeaderText}>User {user}</span>
                <button onClick={() => logoutButton()} className={styles.HeaderButton}>
                    Logout
                </button>
            </div>
            <div className={styles.DataDisplayGroup}>
                {classes.map((item: any) => (
                    <div key={item.name} className={styles.DataDisplay}>
                        <h3 className={styles.NameHeader}>Name</h3>
                        <div className={styles.NameList}>{item.name}</div>
                        <h3 className={styles.NameHeader}>Students</h3>
                        <div className={styles.NameList}>{item.students.join(", ")}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DataDisplay;