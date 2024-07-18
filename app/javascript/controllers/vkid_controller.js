import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values ={
    challenge: String,
    state: String
  }

  connect() {
    console.log("hello")
    const VKID = window.VKIDSDK;
        // Fetch the JSON data from 'auth/challenge'
         console.log(this.stateValue) 
         console.log(this.challengeValue)
          // Set VKID config with fetched data
          VKID.Config.init({
            app: 51989509, // Идентификатор приложения.
            redirectUrl: 'http://localhost:3000/auth/vkontakte/callback', // Адрес для перехода после авторизации.
            codeChallenge: this.challengeValue,
            state: this.stateValue,
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
        
  }};
