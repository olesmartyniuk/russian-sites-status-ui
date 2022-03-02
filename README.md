# Статус рашистських сайтів

Вебсайт показує поточний статус російських сайтів. Моніторинг відбувається кожні 60 сек з багатьох країн світу, включаючи росію (новосибірськ), за протоколом HTTP. 

Це фронтенд частина для [Russian Sites Status API](https://github.com/olesmartyniuk/russian-sites-status-api), написана на TypeScript та [Angular 10](https://angular.io/).

## Початок роботи

Для роботи вам необхідно:

1. Встановити [NodeJS 14.16](https://nodejs.org/de/blog/release/v14.16.0/)
2. Встановити TypeScript `npm install -g typescript`
3. Встановити Angular CLI `npm install -g @angular/cli`
2. Встановити [Git](https://git-scm.com/) 
3. Клонувати репозиторій командою 

`git clone https://github.com/olesmartyniuk/russian-sites-status-ui.git`

Для запуску веб програми локально виконайте наступні команди в склонованому репозиторії:
1. `npm install`
2. `npm start`

Ви повинні побачити наступне повідомлення, що свідчить про успішну компіляцію та запуск проєкту:
```
** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **
: Compiled successfully.
```

## Внесення змін в код

Перед початком попросіть власника додати вас як учасника до репозиторію.

1. Оберіть одну із задач, яка здається вам зрозумілою [зі списку](https://github.com/olesmartyniuk/russian-sites-status-ui/issues) і містить мітку `should be implemented`.
2. Створіть гілку в репозиторії з іменем задачі. (шаблон: ua-issue-суфікс. суфікс - це номер задачі.)
3. Напишіть код і протестуйте зміни локально.
4. Проштовхніть код на сервер і створіть Pull Request в основну гілку.
5. Після того, як Pull Requst буде злито в основну гілку, перевірте ваші зміни на бойовому сервері: http://www.mordor-sites-status.info/

## Додавання нових задач

Ви можете запропонувати новий функціонал чи прозвітувати про баг [на сторінці Issues](https://github.com/olesmartyniuk/russian-sites-status-ui/issues).
