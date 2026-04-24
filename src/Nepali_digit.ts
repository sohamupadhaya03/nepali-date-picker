export const toNepaliNumber = (num: number | string) => {
    const map = ["०","१","२","३","४","५","६","७","८","९"];

    return num
        .toString()
        .split("")
        .map((d) => map[parseInt(d)] ?? d)
        .join("");
};