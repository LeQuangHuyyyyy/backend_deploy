import React, { useState } from "react";
import { Button, Input } from "antd";



const QuantitySelector= ({
  defaultValue = 1,
  min = 1,
  max = 99,
  onChange,
}) => {
  const [value, setValue] = useState(defaultValue);

  // Giảm số lượng
  const handleMinus = () => {
    if (value > min) {
      const newVal = value - 1;
      setValue(newVal);
      onChange?.(newVal);
    }
  };

  // Tăng số lượng
  const handlePlus = () => {
    if (value < max) {
      const newVal = value + 1;
      setValue(newVal);
      onChange?.(newVal);
    }
  };

  // Khi người dùng gõ vào ô Input
  const handleInputChange = (e) => {
    let newValue = parseInt(e.target.value, 10);
    // Nếu gõ ký tự không phải số, đặt về min
    if (isNaN(newValue)) {
      newValue = min;
    }
    // Giới hạn min/max
    if (newValue < min) newValue = min;
    if (newValue > max) newValue = max;

    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div style={{ display: "inline-flex", alignItems: "center" }}>
      <Button  onClick={handleMinus}>
        -
      </Button>
      <Input
        value={value}
        onChange={handleInputChange}
        style={{ width: 60, textAlign: "center" }}
      />
      <Button onClick={handlePlus}>+</Button>
    </div>
  );
};

export default QuantitySelector;
