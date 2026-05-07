# 📅 Soham Nepali Datepicker

A simple and customizable **Nepali (Bikram Sambat) DatePicker** for React.

---

## 📸 Preview

![Soham Nepali Datepicker](https://i.imgur.com/7KO61Oo.png)

## 🚀 Installation

```bash
npm install soham-nepali-datepicker
```

---

## 📦 Usage

```jsx
import { useState } from "react";
import { NepaliDateInput } from "soham-nepali-datepicker";

function App() {
  const [date, setDate] = useState("");

  return (
    <div>
      <NepaliDateInput value={date} onChange={setDate} />
      <p>Selected: {date}</p>
    </div>
  );
}

export default App;
```

---

## 🎯 Features

* Bikram Sambat (BS) Date Support 🇳🇵
* Clean UI similar to English datepicker
* Min / Max date support
* Disabled dates support
* Custom styling ready

---

## ⚙️ Props

### NepaliDateInput

| Prop     | Type     | Description                     |
| -------- | -------- | ------------------------------- |
| value    | string   | Selected BS date (`YYYY-MM-DD`) |
| onChange | function | Callback when date changes      |
| minBs    | string   | Minimum selectable date         |
| maxBs    | string   | Maximum selectable date         |

---

## 🔄 Date Conversion

```ts
import { adToBsString, bsToAd } from "soham-nepali-datepicker";

adToBsString(new Date()); // AD → BS
bsToAd("2081-01-01");     // BS → AD
```

---

## 🎨 Styling

Default styles included:

```js
import "soham-nepali-datepicker/dist/styles.css"; //optional

```

You can override classes:

* `.soham-calendar`
* `.soham-day`
* `.soham-selected`
* `.soham-today`

---

## 📄 License

MIT

---

## 👨‍💻 Author

Soham Upadhaya
