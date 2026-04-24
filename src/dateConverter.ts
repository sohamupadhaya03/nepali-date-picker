import NepaliDate from "nepali-date-converter";

export const adToBsString = (adDate: Date) => {
    const bs = new NepaliDate(adDate);

    const y = bs.getYear();
    const m = String(bs.getMonth() + 1).padStart(2, "0");
    const d = String(bs.getDate()).padStart(2, "0");

    return `${y}-${m}-${d}`;
};

export const bsToAd = (bsDate: string) => {
    if (!bsDate) return null;

    const [year, month, day] = bsDate.split("-").map(Number);

    return new NepaliDate(year, month - 1, day).toJsDate();
};