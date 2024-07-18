import { Controller } from "@hotwired/stimulus"

export default class extends Controller {

  connect() {
    console.log("hello")
    const VKID = window.VKIDSDK;
        // Fetch the JSON data from 'auth/challenge'
        fetch('http://localhost:3000/sessions/challenge')
        .then(response => response.json())
        .then(data => {
          console.log(data);
          // Set VKID config with fetched data
          VKID.Config.init({
            app: 51989509, // Идентификатор приложения.
            redirectUrl: 'http://localhost:3000/auth/vkontakte/callback', // Адрес для перехода после авторизации.
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
