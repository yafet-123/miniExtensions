import React, { useState } from "react";
import { login } from "./userSlice";
import { useDispatch } from "react-redux";
import styles from '../../styles/Home.module.css'
import Airtable from "airtable";

const base = new Airtable({ apiKey: 'keyJWBQiQQLLhs1BD' }).base('app8ZbcPx7dkpOnP0');
import { setClasses} from "../Form/userSlice";


const Login = () => {
    const [user, setuser] = useState("");
    const [error, seterror] = useState("")
    const [Class , setClass] = useState();
    const dispatch = useDispatch();

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const [student] = await base("Students")
        .select({ filterByFormula: `({Name}="${user}")` })
        .all();
        if (student == undefined) {
            seterror(`${user} is not a user`);

        }else{

            const classes = await base("Classes")
                .select({ filterByFormula: `OR(${(student.get("Classes") as string[])?.map((id) => `RECORD_ID()="${id}"`)})` })
                .all();

            const mates = await base("Students")
                .select({
                  filterByFormula: `AND(
                    OR(${classes.map((cl) => `SEARCH("${cl.get("Name")}", {Classes})`)}),
                    NOT(RECORD_ID()="${student.id}")
                  )`,
                })
                .all();
            dispatch(
                setClasses(
                    classes.map((item) => ({
                        name: item.get("Name") as string,
                        students: (item.get("Students") as string[])
                            .map((student) => mates.find((mate) => mate.id === student)?.get("Name"))
                            .filter(Boolean) as string[],
                    }))
                )
            )
            dispatch(login(user)); 
        }
        
    };

    return (
        <div className={styles.login}>
            <p className={styles.error}>{error}</p>
            <form className={styles.login__form} onSubmit={(e) => handleSubmit(e)}>
                <h1>Login miniExtensions</h1>
                <input
                    type="text"
                    placeholder="username"
                    value={user}
                    onChange={(e) => setuser(e.target.value)}
                />
                <button type="submit" className={styles.submit__btn}>
                  Submit
                </button>
            </form>
        </div>
    );
};

export default Login;
