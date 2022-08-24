import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useDispatch, useSelector } from "react-redux";

import DataDisplay from "../components/DisplayData/DataDisplay";
import Login from "../components/Form/Login";

import {selectUser} from "../components/Form/userSlice.ts";

const Home: NextPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    return <div>{user ? <DataDisplay users={user}/> : <Login />}</div>;
}


export default Home
