import { useState } from "react";
import { useVinStore } from "../../store/useVinStore";
import css from "./VinForm.module.css";

export default function VinForm() {
  const [inputValue, setInputValue] = useState("");
  const [localError, setLocalError] = useState("");

  // Беремо потрібні дії та стан із нашого стору
  const decodeVin = useVinStore((state) => state.decodeVin);
  const isLoading = useVinStore((state) => state.isLoading);
  const globalError = useVinStore((state) => state.error);

  // Робимо валідацію VIN
  const validateVin = (vin) => {
    const cleanVin = vin.trim();

    if (!cleanVin) {
      return "Поле не може бути порожнім";
    }

    if (cleanVin.length !== 17) {
      return `VIN-код повинен складатися рівно з 17 символів (зараз: ${cleanVin.length})`;
    }

    // Для виявлення заборонених в VIN літер I, O, Q
    const allowedCharsRegex = /^[A-HJ-NPR-Z0-9]+$/i;

    if (!allowedCharsRegex.test(cleanVin)) {
      // Перевіряємо, чи є заборонені літери
      const hasForbiddenLetters = /[ioq]/i.test(cleanVin);
      if (hasForbiddenLetters) {
        return "Літери I, O, Q заборонені в VIN-кодах (щоб уникнути плутанини з 1 та 0)";
      }
      return "Дозволені лише латинські літери та цифри";
    }

    return ""; // Якщо помилок немає
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setInputValue(val.toUpperCase());

    if (localError) {
      setLocalError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorMsg = validateVin(inputValue);
    if (errorMsg) {
      setLocalError(errorMsg);
      return;
    }

    await decodeVin(inputValue);
  };

  const activeError =
    localError || (globalError ? `Результат запиту: ${globalError}` : "");

  return (
    <div className={css["form-container"]}>
      <form onSubmit={handleSubmit} className={css.form} noValidate>
        <div className={css["input-group"]}>
          <label htmlFor="vin-input" className={css.label}>
            Введіть 17-значний VIN-код
          </label>
          <input
            id="vin-input"
            type="text"
            className={`${css.input} ${activeError ? css["input-error"] : ""}`}
            value={inputValue}
            onChange={handleChange}
            maxLength="17"
            placeholder="Наприклад: 1FTFW1CT5DFC10312"
            disabled={isLoading}
            autoComplete="off"
            spellCheck="false"
          />
          <div className={css["error-message"]}>
            {activeError && <span>{activeError}</span>}
          </div>
        </div>

        <button type="submit" className={css.button} disabled={isLoading}>
          {isLoading ? "Декодування..." : "Розшифрувати"}
        </button>
      </form>
    </div>
  );
}
