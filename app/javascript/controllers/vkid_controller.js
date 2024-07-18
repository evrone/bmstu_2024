import { Controller } from "@hotwired/stimulus"

export default class extends Controller {

  connect() {
    const VKID = window.VKIDSDK;
        // Fetch the JSON data from 'auth/challenge'
        fetch('https://wheremylikes.com/sessions/challenge')
        .then(response => response.json())
        .then(data => {
          console.log(data);
          // Set VKID config with fetched data
          VKID.Config.init({
            app: 51989509, // Идентификатор приложения.
            redirectUrl: 'https://wheremylikes.com/auth/vkontakte/callback', // Адрес для перехода после авторизации.
            codeChallenge: data.challenge,
            state: data.state,
            //scope: "friends wall"
          });
          // Создание экземпляра кнопки.
          const oneTap = new VKID.OneTap();
          // Получение контейнера из разметки.
          const container = document.getElementById('VkIdSdkOneTap');
          // Проверка наличия кнопки в разметке.
          if (container) {
            // Удаление старой кнопки, если она существует.
            while (container.firstChild) {
              container.removeChild(container.firstChild);
            }
            // Отрисовка кнопки в контейнере с именем приложения APP_NAME, светлой темой и на русском языке.
            const res = oneTap.render({ container: container, scheme: VKID.Scheme.LIGHT, lang: VKID.Languages.RUS })
          }
          const handleClick = () => {
            // Открытие авторизации.
            VKID.Config.init()
            VKID.Auth.login()
          }
        });
  }};
