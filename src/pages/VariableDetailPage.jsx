import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useVinStore } from "../store/useVinStore.js";
import css from "./VariableDetailPage.module.css";

export default function VariableDetailPage() {
  const { id } = useParams();

  const variables = useVinStore((state) => state.variables);
  const fetchVariables = useVinStore((state) => state.fetchVariables);
  const isLoading = useVinStore((state) => state.isLoadingVariables);

  // Забезпечуємо завантаження даних за прямим посиланням
  useEffect(() => {
    if (variables.length === 0) {
      fetchVariables();
    }
  }, [variables, fetchVariables]);

  // Шукаємо потрібну характеристику у масиві
  const variableInfo = variables.find((item) => item.ID.toString() === id);

  if (isLoading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "100px" }}
      >
        <p style={{ color: "#0066cc", fontWeight: 600 }}>
          Завантаження детальної інформації...
        </p>
      </div>
    );
  }

  // Якщо змінну з таким ID не знайдено
  if (!variableInfo) {
    return (
      <main className={css.container}>
        <div className={css["not-found"]}>
          <h2 className={css["not-found-title"]}>Характеристику не знайдено</h2>
          <p>Можливо, вказано некоректний ID специфікації.</p>
          <Link
            to="/variables"
            className={css["back-link"]}
            style={{ marginTop: "16px" }}
          >
            Повернутися до списку
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={css.container}>
      <Link to="/variables" className={css["back-link"]}>
        <span>&larr;</span> Назад до списку специфікацій
      </Link>

      <article className={css.card}>
        <span className={css.badge}>ID: {variableInfo.ID}</span>
        <h1 className={css.title}>{variableInfo.Name}</h1>

        <hr className={css.divider} />

        <h2 className={css.subtitle}>Опис характеристики</h2>

        {variableInfo.Description ? (
          <div
            className={css.description}
            dangerouslySetInnerHTML={{ __html: variableInfo.Description }}
          />
        ) : (
          <p
            className={css.description}
            style={{ fontStyle: "italic", color: "#718096" }}
          >
            Для цієї характеристики детальний опис у базі відсутній.
          </p>
        )}
      </article>
    </main>
  );
}
