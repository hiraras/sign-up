import React from "react";
import { Calendar, Tooltip } from "antd";
import styles from "./style.module.scss";
import { getItem } from "@/utils/storage";
import { SIGN_UP_DATA } from "@/constants/storageKeys";
import { DAY_FORMAT, TIME_FORMAT } from "@/constants/time";
import moment from "moment";

const TimeTooltip = ({ times }) => {
    return times.map((time, index) => {
        return (
            <div key={index}>
                <p>
                    开始:
                    {moment(time.startTime).format(TIME_FORMAT)}
                </p>
                <p>
                    结束:
                    {moment(time.endTime).format(TIME_FORMAT)}
                </p>
            </div>
        );
    });
};

const getDuration = (times) => {
    const totalTime = times.reduce((prev, time) => {
        return prev + time.endTime - time.startTime;
    }, 0);
    return Math.round(Math.floor(totalTime / 1000) / 60);
};

const CalendarPage = () => {
    const data = getItem(SIGN_UP_DATA);

    const dateCellRender = (value) => {
        const day = value.format(DAY_FORMAT);
        const index = data.findIndex((d) => d.day === day);
        const times = data[index]?.times || [];
        if (times.length) {
            return (
                <Tooltip title={<TimeTooltip times={times} />}>
                    打卡{times.length}次 共{getDuration(times)}分钟
                </Tooltip>
            );
        }
        return null;
    };
    return (
        <div className={styles.ctn}>
            <Calendar dateCellRender={dateCellRender} />
        </div>
    );
};

export default CalendarPage;
