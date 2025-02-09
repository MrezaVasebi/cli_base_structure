import { isShebaValid, verifyCardNumber } from "@persian-tools/persian-tools";
import moment from "jalali-moment";
import RNExitApp from "react-native-exit-app";

export type TimeType = { h: number; m: number; s: number };

export function secondsToTime(secs: number): TimeType {
  let hours = Math.floor(secs / (60 * 60));

  let divisor_for_minutes = secs % (60 * 60);
  let minutes = Math.floor(divisor_for_minutes / 60);

  let divisor_for_seconds = divisor_for_minutes % 60;
  let seconds = Math.ceil(divisor_for_seconds);

  let obj: TimeType = {
    h: hours,
    m: minutes,
    s: seconds,
  };

  return obj;
}

export const getDayName = (date: string) => {
  const persianDays = [
    "یکشنبه",
    "دوشنبه",
    "سه شنبه",
    "چهارشنبه",
    "پنج شنبه",
    "جمعه",
    "شنبه",
  ];

  const dayIndex = new Date(date).getDay();
  return persianDays[dayIndex] || null;
};

export const getMonthName = (month: string) => {
  switch (month) {
    case "01":
      return "فروردین";
    case "02":
      return "اردیبهشت";
    case "03":
      return "خرداد";
    case "04":
      return "تیر";
    case "05":
      return "مرداد";
    case "06":
      return "شهریور";
    case "07":
      return "مهر";
    case "08":
      return "آبان";
    case "09":
      return "آذر";
    case "10":
      return "دی";
    case "11":
      return "بهمن";
    case "12":
      return "اسفند";
    default:
      return null;
  }
};

export const numberWithCommas = (value: string) => {
  return value && value !== "0"
    ? value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : "";
};

export const convertGeoDateTimeToShamsiWithMonth = (date: string) => {
  // input -> "2022-04-22T17:18:00.000Z"
  // output -> چهارشنبه 8 دی - 11:25

  if (!date) return null;

  const dateTime = moment
    .from(new Date(date).toISOString(), "en", "YYYY/MM/DD HH:mm")
    .locale("fa")
    .format("YYYY/MM/DD HH:mm")
    .split(" ");

  const [year, month, day] = dateTime[0].split("/");
  const time = dateTime[1];
  const dayName = getDayName(date);
  const monthName = getMonthName(month);

  return `${dayName} ${day} ${monthName} - ${time}`;
};

export const convertGeoDateTimeToShamsiDate = (date: string) => {
  // input ->"2022-04-22T17:18:00.000Z"
  // output -> 1400/01/01

  if (!date) return null;

  const splittedDate = date.split("T")[0];
  return convertGeoDateToShamsiDate(splittedDate);
};

export const convertShamsiDateToGeoDate = (date: string) => {
  // input -> 1402/1/7
  // output -> 2023/03/27
  return moment.from(date, "fa", "YYYY/MM/DD").format("YYYY/MM/DD");
};

export const convertGeoDateToShamsiDate = (date: string) => {
  // input: 2022-08-27
  // output: 1401/06/05

  if (!date) return null;
  return moment(date, "YYYY-MM-DD").locale("fa").format("YYYY/MM/DD");
};

export const fromNow = (timestamp: Date) => {
  // input: new Date("2023-02-01")

  const elapsed = Date.now() - timestamp.getTime();
  const minutes = Math.floor(elapsed / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years >= 1) return "aFewYearsAgo";
  if (months >= 1) return "aFewMonthAgo";
  if (days >= 1) return "aFewDaysAgo";
  if (hours >= 1) return "aFewHoursAgo";
  if (minutes >= 1) return "aFewMinutesAgo";
  return "justNow";
};

export const checkValidateEmail = (email: string) => {
  if (!email || email === "" || email.length === 0) return false;

  return email.match(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  )
    ? true
    : false;
};

export const checkValidIBAN = (iban: string) => {
  return isShebaValid(iban);
};

export const checkValidCardNumber = (cardNumber: number) => {
  return verifyCardNumber(cardNumber);
};

// format card number, iban
export const formatStringWithDashes = (inputString: string): string => {
  // output: 4104-3376-009-7541
  const matches = inputString.match(/.{1,4}/g);
  if (!matches) return "";

  return matches.join(" - ");
};

// number with dash - every 4 digits
export const numberWithCommaBankCards = (number: string) => {
  return number ? number.toString().replace(/\B(?=(\d{4})+(?!\d))/g, "-") : "";
};

// remove comma
export const removeCommaFromNumber = (number: string) => {
  return number ? number.toString().replace(/,/g, "") : "";
};

// convert persian number to english digit
export const enDigit = (number: string) => {
  return number
    ? number
        .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d).toString())
        .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString())
    : "";
};

// convert number to persian digit
export const faDigit = (number: string) => {
  return number ? number.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]) : "";
};

// check password strength
export function checkPasswordStrength(password: string) {
  // Initialize variables
  var strength = 0;
  var tips = "";

  // Check password length
  if (password.length < 8) {
    tips += "Make the password longer. ";
  } else {
    strength += 1;
  }

  // Check for mixed case
  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
    strength += 1;
  } else {
    tips += "Use both lowercase and uppercase letters. ";
  }

  // Check for numbers
  if (password.match(/\d/)) {
    strength += 1;
  } else {
    tips += "Include at least one number. ";
  }

  // Check for special characters
  if (password.match(/[^a-zA-Z\d]/)) {
    strength += 1;
  } else {
    tips += "Include at least one special character. ";
  }

  // Return results
  if (strength < 2) {
    return "Easy to guess. " + tips;
  } else if (strength === 2) {
    return "Medium difficulty. " + tips;
  } else if (strength === 3) {
    return "Difficult. " + tips;
  } else {
    return "Extremely difficult. " + tips;
  }
}

// check for special characters
export const includesSpecialCharacter = (password: string) => {
  return password.match(/[^a-zA-Z\d]/) ? true : false;
};

// check for mixed case
export const includesMixedCase = (password: string) => {
  return password.match(/[a-z]/) && password.match(/[A-Z]/) ? true : false;
};

// check password length
export const checkPassLength = (password: string) => {
  return password.length > 8;
};

// check has numbers
export const includesNumber = (password: string) => {
  return password.match(/\d/) ? true : false;
};

// exit the application
export const exitApplication = () => {
  RNExitApp.exitApp();
};
