import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values ={
    pkce: Object
  }

  connect() {
    const VKID = window.VKIDSDK;
    const data = this.pkceValue;
    const challenge = data.challenge;
    const state = data.state;
    // Fetch the JSON data from 'auth/challenge'
    // Set VKID config with fetched data
    VKID.Config.init({
      app: window.VK_APP_ID, // Идентификатор приложения.
      redirectUrl: window.VK_AUTH_REDIRECT_URL, // Адрес для перехода после авторизации.
      codeChallenge: challenge,
      state: state,
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
  }
};
