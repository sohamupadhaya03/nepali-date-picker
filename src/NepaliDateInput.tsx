import React, { useState } from "react";
import NepaliDatePickerCustom from "./NepaliDatePickerCustom";
import Popup from "./Popup";

export default function NepaliDateInput({
  value,
  onChange,
  minBs,
  maxBs,
}: any) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      <div className="soham-input-wrapper">
        <input
          readOnly
          value={value}
          placeholder="yyyy-mm-dd"
          onClick={() => setOpen(true)}
          className="soham-input"
        />
        <span className="soham-icon">📅</span>
      </div>

      {open && (
        <Popup onClose={() => setOpen(false)}>
          <NepaliDatePickerCustom
            value={value}
            onChange={(val) => {
              onChange(val);
              setOpen(false);
            }}
            minBs={minBs}
            maxBs={maxBs}
          />
        </Popup>
      )}
    </div>
  );
}
