import { useMemo, useState, useEffect } from "react";
import NepaliDate from "nepali-date-converter";
import { toNepaliNumber } from "./Nepali_digit";

interface Props {
  value: string;
  onChange: (val: string) => void;
  minBs?: string;
  maxBs?: string;
  disabledDates?: string[];
}

export default function NepaliDatePickerCustom({
  value,
  onChange,
  minBs,
  maxBs,
  disabledDates = [],
}: Props) {
  const today = new NepaliDate(new Date());
  const todayBs = new NepaliDate(new Date());
  const months = [
    "बैशाख",
    "जेठ",
    "असार",
    "श्रावण",
    "भदौ",
    "आश्विन",
    "कार्तिक",
    "मंसिर",
    "पौष",
    "माघ",
    "फाल्गुन",
    "चैत्र",
  ];

  const todayStr = `${todayBs.getYear()}-${String(todayBs.getMonth() + 1).padStart(2, "0")}-${String(todayBs.getDate()).padStart(2, "0")}`;
  const getInitialDate = () => {
    if (value && value.length >= 10) {
      const [y, m] = value.split("-").map(Number);
      return { year: y, month: m };
    }
    return {
      year: today.getYear(),
      month: today.getMonth() + 1,
    };
  };

  const initial = getInitialDate();

  const [year, setYear] = useState(initial.year);
  const [month, setMonth] = useState(initial.month);

  useEffect(() => {
    if (value && value.length >= 10) {
      const [y, m] = value.split("-").map(Number);
      setYear(y);
      setMonth(m);
    }
  }, [value]);

  // 👉 generate days (simple BS approach)
  const days = useMemo(() => {
    const list: number[] = [];

    // Go next month first day, then subtract 1 day
    const nextMonth =
      month === 12
        ? new NepaliDate(year + 1, 0, 1)
        : new NepaliDate(year, month, 1);

    const lastDayAd = new NepaliDate(nextMonth.toJsDate().getTime() - 86400000);
    const lastDayBs = new NepaliDate(lastDayAd.toJsDate());

    const daysInMonth = lastDayBs.getDate();

    for (let i = 1; i <= daysInMonth; i++) {
      list.push(i);
    }

    return list;
  }, [year, month]);

  const format = (d: number) =>
    `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const bsToAd = (bs: string) => {
    const [y, m, d] = bs.split("-").map(Number);
    return new NepaliDate(y, m - 1, d).toJsDate();
  };
  const isValidDate = (date: string) => {
    if (disabledDates.includes(date)) return false;

    const adDate = bsToAd(date).getTime();

    if (minBs) {
      const minAd = bsToAd(minBs).getTime();
      if (adDate < minAd) return false;
    }

    if (maxBs) {
      const maxAd = bsToAd(maxBs).getTime();
      if (adDate > maxAd) return false;
    }

    return true;
  };

  const handlePrev = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNext = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  };

  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div className="soham-calendar">
      {/* HEADER */}
      <div className="soham-header">
        {/* LEFT: PREV BUTTON */}
        <button type="button" onClick={handlePrev} className="soham-nav-btn">
          ◀
        </button>
        <div className="soham-title">
          {months[month - 1]} {year}
        </div>

        {/* RIGHT: NEXT BUTTON */}
        <button type="button" onClick={handleNext} className="soham-nav-btn">
          ▶
        </button>
      </div>
      <div className="soham-controls">
        <div className="flex items-center gap-2">
          {/* MONTH DROPDOWN */}
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="soham-select"
          >
            {[
              "बैशाख",
              "जेठ",
              "असार",
              "श्रावण",
              "भदौ",
              "आश्विन",
              "कार्तिक",
              "मंसिर",
              "पौष",
              "माघ",
              "फाल्गुन",
              "चैत्र",
            ].map((m, i) => (
              <option key={i} value={i + 1}>
                {m}
              </option>
            ))}
          </select>

          {/* YEAR DROPDOWN */}
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="soham-select"
          >
            {Array.from({ length: 200 }, (_, i) => {
              const y = 2000 + i; // from 2000 BS to 2199 BS
              return (
                <option key={y} value={y}>
                  {toNepaliNumber(y)}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* WEEK DAYS */}
      <div className="soham-weekdays">
        {weekDays.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* GRID */}
      <div className="soham-grid">
        {days.map((d) => {
          const date = format(d);
          const disabled = !isValidDate(date);

          return (
            <button
              key={d}
              type="button"
              disabled={disabled}
              onClick={() => !disabled && onChange(date)}
              className={`
  soham-day
  ${value === date ? "soham-selected" : ""}
  ${date === todayStr && value !== date ? "soham-today" : ""}
  ${disabled ? "soham-disabled" : ""}
`}
            >
              {toNepaliNumber(d)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
