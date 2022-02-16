import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import moment from "moment";
import { Button } from "antd";
import { SIGN_UP, SIGN_UP_TIME, SIGN_UP_DATA } from "@/constants/storageKeys";
import { getItem, setItem, removeItem } from "@/utils/storage";
import { TIME_FORMAT, DAY_FORMAT } from "@/constants/time";

const Home = () => {
    const [time, setTime] = useState(+new Date());
    const [signUp, setSignUp] = useState(getItem(SIGN_UP) || false);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((t) => t + 1000);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const press = () => {
        if (signUp) {
            const signUpTime = getItem(SIGN_UP_TIME);
            const data = getItem(SIGN_UP_DATA) || [];
            const today = moment(time).format(DAY_FORMAT);
            const index = data.findIndex((d) => d.day === today);
            const newTime = {
                startTime: signUpTime,
                endTime: +new Date(),
            };
            if (index !== -1) {
                data[index].times = [...(data[index].times || []), newTime];
            } else {
                data.push({ day: today, times: [newTime] });
            }
            setItem(SIGN_UP_DATA, JSON.stringify(data));
            setItem(SIGN_UP, false);
            removeItem(SIGN_UP_TIME);
            return setSignUp((s) => !s);
        }
        setItem(SIGN_UP, true);
        setItem(SIGN_UP_TIME, time);
        setSignUp((s) => !s);
    };

    return (
        <div className={styles.ctn}>
            <p className={styles.timeTip}>{moment(time).format(TIME_FORMAT)}</p>
            <Button type="primary" onClick={press}>
                {signUp ? "结束打卡" : "开始打卡"}
            </Button>
        </div>
    );
};

export default Home;
