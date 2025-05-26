import dayjs from "dayjs";
import isYesterday from "dayjs/plugin/isYesterday";
import weekday from "dayjs/plugin/weekday";
import isBetween from "dayjs/plugin/isBetween";
import duration from "dayjs/plugin/duration";
import isoWeek from "dayjs/plugin/isoWeek";
import isToday from "dayjs/plugin/isToday";
dayjs.extend(isYesterday);
dayjs.extend(weekday);
dayjs.extend(isBetween);
dayjs.extend(duration);
dayjs.extend(isoWeek);
dayjs.extend(isToday);

const weekString = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
];
/**
 * 判断一个日期是否在本周内
 * @param {*} target
 * @returns
 */
export function isTimeWeek(target) {
  const currentTime = dayjs();
  const startOfWeek = currentTime.weekday(1).format("YYYY-MM-DD 00:00");
  const endOfWeek = currentTime.weekday(7).format("YYYY-MM-DD 23:59");
  return target.isBetween(startOfWeek, endOfWeek, null, "[]");
}
/**
 * 判断一个时间是上午中午下午还是晚上
 * @param {*} target
 * @returns
 */
export function isTimeState(target) {
  const hours = dayjs(target).format("HH");
  let state = "";
  if (hours >= 0 && hours <= 4) {
    state = `凌晨`;
  } else if (hours > 4 && hours <= 10) {
    state = `上午`;
  } else if (hours > 10 && hours <= 14) {
    state = `中午`;
  } else if (hours > 14 && hours <= 18) {
    state = `下午`;
  } else if (hours > 18 && hours <= 24) {
    state = "晚上";
  }
  return state;
}
export function formatTimeFromSeconds(time) {
  if (typeof time !== "string") {
    console.error("time error");
    return "-";
  }
  const parts = time.split(":").map((i) => {
    if (Number(i) < 10) return Number(i.slice(1));
    return Number(i);
  });
  const seconds = parts[0] * 60 * 60 + parts[1] * 60 + parts[2];
  if (!seconds) return "-";
  // 转换为duration对象
  const duration = dayjs.duration(seconds, "seconds");

  // 确定需要的单位并格式化显示
  if (seconds >= 24 * 60 * 60) {
    return `${duration.days()}天 ${duration.hours()}小时 ${duration.minutes()}分钟 ${duration.seconds()}秒`;
  } else if (seconds >= 60 * 60) {
    return `${duration.hours()}小时 ${duration.minutes()}分钟 ${duration.seconds()}秒`;
  } else if (seconds >= 60) {
    return `${duration.minutes()}分钟 ${duration.seconds()}秒`;
  } else {
    return `${duration.seconds()} 秒`;
  }
}
export function formatTimeMinutes(days) {
  const totalMinutes = days * 24 * 60; // 计算总分钟数
  const duration = dayjs.duration(totalMinutes, "minutes");

  // 确定需要的单位并格式化显示
  if (duration.asYears() >= 1) {
    return `${Math.floor(duration.asYears())}年 ${
      Math.floor(duration.asDays()) % 365
    }天`;
  } else if (duration.asHours() >= 1) {
    return `${Math.floor(duration.asHours())}小时 ${duration.minutes()}分钟`;
  } else if (duration.asMinutes() >= 1) {
    return `${duration.minutes()}分钟`;
  } else {
    return `${duration.seconds()}秒`;
  }
}
export function compareTime(dateTime) {
  if (!dateTime) return "";
  const currentTime = dayjs();
  const target = dayjs(dateTime); // 给定的日期时间

  if (currentTime.isSame(target, "day")) {
    const time = target.format("HH:mm"); // 日一样，返回当前时间
    return `${isTimeState(target)} ${time}`;
  } else if (target.isYesterday()) {
    return `昨天 ${isTimeState(target)}${target.format("HH:mm")}`; // 年月一样，判断是否是昨天，返回昨天字符串
  } else if (isTimeWeek(target)) {
    return `${weekString[target.day()]} ${target.format("HH:mm")}`; //在本周内，返回星期几时间端时间
  } else if (currentTime.isSame(target, "month")) {
    return target.format(`M月D日 ${isTimeState(target)} HH:mm`); // 年月一样，返回月日 时间端时间
  } else if (currentTime.isSame(target, "year")) {
    return target.format(`M月D日 ${isTimeState(target)} HH:mm`); // 年一样，，返回月日 时间端时间
  } else {
    return target.format(`YYYY年M月D日 ${isTimeState(target)} HH:mm`); // 年份不一样，返回年月日
  }
}
