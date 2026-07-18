import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useVinStore } from "../store/useVinStore";
import css from "./VariablesPage.module.css";

// Допоміжна функція для очищення опису від HTML-тегів
const stripHtml = (htmlString) => {
  if (!htmlString) return "Опис відсутній.";
  return htmlString.replace(/<\/?[^>]+(>|$)/g, "");
};

export default function VariablesPage() {
  const variables = useVinStore((state) => state.variables);
  const fetchVariables = useVinStore((state) => state.fetchVariables);
  const isLoading = useVinStore((state) => state.isLoadingVariables);
  const error = useVinStore((state) => state.error);

  // Завантажуємо список при монтуванні сторінки
  useEffect(() => {
    fetchVariables();
  }, [fetchVariables]);

  if (isLoading) {
    return (
      <div className={css.loading}>
        <div>Завантаження списку специфікацій...</div>
      </div>
    );
  }

  if (error && variables.length === 0) {
    return (
      <div className={css.container}>
        <div className={css.error}>
          <strong>Помилка:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <main className={css.container}>
      <header className={css.header}>
        <h1 className={css.title}>Специфікації автомобілів</h1>
        <p className={css.subtitle}>
          Повний перелік технічних характеристик, систем та параметрів, які
          використовуються для опису транспортних засобів у базі NHTSA.
        </p>
      </header>

      <section className={css.grid} aria-label="Список технічних характеристик">
        {variables.map((variable) => {
          const cleanDesc = stripHtml(variable.Description);

          return (
            <Link
              key={variable.ID}
              to={`/variables/${variable.ID}`}
              className={css.card}
            >
              <h2 className={css["card-title"]}>{variable.Name}</h2>
              <p className={css["card-description"]}>{cleanDesc}</p>
              <div className={css["card-footer"]}>
                Детальний опис <span>&rarr;</span>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
