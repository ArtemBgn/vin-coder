import { useVinStore } from "../../store/useVinStore";
import css from "./HistoryList.module.css";

export default function HistoryList() {
  const history = useVinStore((state) => state.history);
  const currentVin = useVinStore((state) => state.currentVin);
  const decodeVin = useVinStore((state) => state.decodeVin);
  const isLoading = useVinStore((state) => state.isLoading);

  // Якщо історія порожня, нічого не показуємо
  if (history.length === 0) {
    return null;
  }

  const handleHistoryClick = async (vin) => {
    // Не робимо запит повторно, якщо цей VIN уже показується
    if (vin === currentVin || isLoading) return;
    await decodeVin(vin);
  };

  return (
    <div className={css["history-container"]}>
      <h3 className={css.title}>Останні запити</h3>
      <ul className={css.list}>
        {history.map((vin) => {
          const isActive = vin === currentVin;
          return (
            <li key={vin} className={css.item}>
              <button
                type="button"
                onClick={() => handleHistoryClick(vin)}
                className={`${css.button} ${isActive ? css["button-active"] : ""}`}
                disabled={isLoading}
                title={`Повторно розшифрувати ${vin}`}
              >
                {vin}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
