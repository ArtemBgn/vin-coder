import VinForm from "../components/VinForm/VinForm";
import HistoryList from "../components/HistoryList/HistoryList";
import DecodeResults from "../components/DecodeResults/DecodeResults";
import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <article className={css.container}>
      {/* Шапка сторінки */}
      <header className={css["hero-section"]}>
        <h1 className={css.title}>Декодер VIN-кодів</h1>
        <p className={css.subtitle}>
          Миттєва розшифровка технічних характеристик автомобіля за його
          унікальним ідентифікатором.
        </p>
      </header>

      {/* Основний вміст */}
      <div className={css["main-content"]}>
        {/* Панель керування */}
        <section className={css["control-panel"]} aria-label="Панель пошуку">
          <VinForm />
          <HistoryList />
        </section>

        {/* Панель результатів */}
        <section
          className={css["results-panel"]}
          aria-label="Результати розшифровки"
        >
          <DecodeResults />
        </section>
      </div>
    </article>
  );
}
