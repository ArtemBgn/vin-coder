import { useVinStore } from "../../store/useVinStore";
import css from "./DecodeResults.module.css";

export default function DecodeResults() {
  const currentVin = useVinStore((state) => state.currentVin);
  const decodeResults = useVinStore((state) => state.decodeResults);
  const isLoading = useVinStore((state) => state.isLoading);

  // Під час завантаження нічого не рендеримо в цій області
  if (isLoading) {
    return null;
  }

  // Якщо ще нічого не шукали — показуємо легку підказку
  if (!currentVin) {
    return (
      <div
        style={{
          color: "#666",
          marginTop: "24px",
          fontSize: "14px",
          fontStyle: "italic",
        }}
      >
        Введіть VIN-код вище, щоб отримати повну технічну інформацію про
        автомобіль.
      </div>
    );
  }

  // Якщо запит пройшов успішно, але масив результатів порожній
  if (decodeResults.length === 0) {
    return (
      <div className={css["results-container"]}>
        <h3 className={css.title}>Результати для VIN: {currentVin}</h3>
        <p>На жаль, за цим кодом не знайдено заповнених характеристик.</p>
      </div>
    );
  }

  return (
    <div className={css["results-container"]}>
      <h3 className={css.title}>Результати для VIN: {currentVin}</h3>

      <div className={css["table-wrapper"]}>
        <table className={css.table}>
          <thead>
            <tr>
              <th className={css.th}>Параметри</th>
              <th className={css.th}>Значення</th>
            </tr>
          </thead>
          <tbody>
            {decodeResults.map((item) => (
              <tr key={item.VariableId} className={css.tr}>
                <td className={`${css.td} ${css["variable-name"]}`}>
                  {item.Variable}
                </td>
                <td className={`${css.td} ${css["variable-value"]}`}>
                  {item.Value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
