# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## +++++++++++++++++++++++++++++++++

# 🚗 VIN Decoder App

Вебзастосунок (SPA) для миттєвої розшифровки автомобільних VIN-кодів (Vehicle Identification Number) та перегляду технічних специфікацій бази даних NHTSA.

Проєкт створено в межах виконання тестового завдання.

## 🔗 Демонстрація та Посилання

- **Живий застосунок (Live Demo):** [Посилання на твій деплой (наприклад, Vercel/Netlify)](https://your-app-link.vercel.app)
- **Репозиторій на GitHub:** [https://github.com/your-username/vin-decoder](https://github.com/your-username/vin-decoder)

---

## 🛠️ Технологічний стек

При розробці застосунку акцент було зроблено на швидкодії, чистоті коду та відсутності зайвого "шуму" в залежностях:

- **Frontend:** React 18 (Vite) — для швидкої збірки та миттєвого HMR.
- **Роутинг:** React Router v6 — декларативний роутинг для SPA.
- **Керування станом:** Zustand — сучасний, швидкий та легкий стейт-менеджер.
- **Збереження даних:** Zustand `persist` middleware — для автоматичної синхронізації історії запитів з `localStorage`.
- **Стилізація:** Чистий CSS з використанням **CSS Modules** (без використання важких CSS-фреймворків за вимогами ТЗ) — забезпечує повну ізоляцію стилів компонентів та легку підтримку.

---

## ✨ Реалізований функціонал

1. **Головна сторінка (`/`):**
   - **Форма введення VIN** із суворою валідацією на фронтенді (перевірка пустих значень, довжини рівно 17 символів та відсутності заборонених стандартом ISO літер `I`, `O`, `Q`).
   - **Історія з 3-х останніх унікальних запитів**, яка зберігається між перезавантаженнями сторінки. Клік по елементу історії запускає повторне декодування.
   - **Адаптивна таблиця результатів**, яка відображає лише заповнені характеристики (`Variable` та `Value`) і безпечно підлаштовується під будь-які мобільні екрани.
   - **Обробка помилок:** Виведення помилок валідації та повідомлень від сервера (поле `Message` з API) безпосередньо в інтерфейсі.

2. **Сторінка специфікацій (`/variables`):**
   - Повний перелік технічних параметрів бази даних NHTSA у вигляді адаптивної сітки карток.
   - Очищення описів від сирих HTML-тегів, що приходять з бази, та обмеження тексту (Line Clamping) для гармонійного вигляду карток.
   - **Розумне кешування:** список завантажується лише один раз при першому переході на сторінку.

3. **Детальна сторінка специфікації (`/variables/:id`):**
   - Відображення детального опису та ідентифікатора конкретної змінної.
   - Підтримка HTML-форматування описів для збереження таблиць, списків та абзаців з бази даних.
   - Стійкість до перезавантаження: якщо користувач переходить за прямим посиланням, застосунок автоматично завантажує необхідні дані.

---

## 📐 Верстка та Адаптивність

Інтерфейс повністю адаптивний і протестований у роздільних здатностях **від 420px до 1440px**:

- Для побудови сіток використано **CSS Grid** та **Flexbox**.
- На мобільних екранах елементи інтерфейсу перебудовуються в акуратний вертикальний стек, а таблиця результатів отримує безпечний горизонтальний скрол, не ламаючи загальну ширину сторінки.
- Меню навігації (`header`) зафіксоване вгорі екрана (`sticky`), що забезпечує швидкий доступ до розділів при довгому скролі.

---

## 🚀 Інструкція з локального запуску

Для запуску проєкту на локальному комп'ютері переконайтеся, що у вас встановлено **Node.js** (версії 18 або новішої).

1. **Клонуйте репозиторій:**

   ```bash
   git clone [https://github.com/your-username/vin-decoder.git](https://github.com/your-username/vin-decoder.git)
   ```

2. **Перейдіть у папку проєкту:**

   ```bash
   cd vin-decoder
   ```

3. **Встановіть залежності:**

   ```bash
   npm install
   ```

4. **Запустіть сервер для розробки:**

   ```bash
   npm run dev
   ```

5. **Відкрийте застосунок у браузері:**

   ```bash
   Перейдіть за адресою, яку вкаже термінал (зазвичай це http://localhost:5173)
   ```

6. **📦 Складання для продакшену:**
   ```bash
   npm run build
   ```
