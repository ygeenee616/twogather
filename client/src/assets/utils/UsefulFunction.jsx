import { useEffect } from "react";

export const validateEmail = (email) => {
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validatePassword = (password) => {
  return (
    password.match(/[A-Z]/ && /[a-z]/ && /[0-9]/ && /[^A-Za-z0-9]/) &&
    password.length >= 8 &&
    password.length <= 16
  );
};

export const addCommas = (n) => {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const useScript = (url) => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = url;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};

export const isFutureDate = (date, startTime) => {
  //
  // 해당 날짜, 시작시간이 현재기준으로 미래인지
  // YYYY-MM-DD 형태의 날짜값
  const today = new Date();
  const year = parseInt(date.split("-")[0]);
  const month = parseInt(date.split("-")[1]);
  const day = parseInt(date.split("-")[2]);
  const time = parseInt(startTime);

  if (year > parseInt(today.getFullYear())) return true;
  else if (year === today.getFullYear()) {
    if (month > today.getMonth() + 1) return true;
    else if (month === today.getMonth() + 1) {
      if (day > today.getDate()) return true;
      else if (day === today.getDate() && time > today.getHours()) return true;
    }
  }

  return false;
};
