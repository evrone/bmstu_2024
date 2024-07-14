import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="vkid"

export default class extends Controller {
  static values = {
    url: Array
  }
  connect() {
    console.log("Hello");
    
    const VKID = window.VKIDSDK;
        VKID.Config.init({
          app: '51989509', // Идентификатор приложения.
          redirectUrl: 'https://wheremylikes.com/auth/vkontakte/callback/', // Адрес для перехода после авторизации.
          //state: "<%= @state %>", // Произвольная строка состояния приложения.
          //codeVerifier: "<%= @code_challenge%>", // Верификатор в виде случайной строки. Обеспечивает защиту передаваемых данных.
          //scope: '<%= @scopes %>' // Список прав доступа, которые нужны приложению.
          state: 'df29figadjsd82',
          codeVerifier: 'FzG+WDtlamaYFRXi83XYv47GnVhUXw5ipjCYGzjV9js=',
          scope: 'vkid.personal_info friends wall'

        });
        
        // Получение кнопки из разметки.
        const button = document.getElementById('VKIDSDKAuthButton');
        // Проверка наличия кнопки в разметке.
        if (button) {
          // Добавление обработчика клика по кнопке.
          button.onclick = handleClick;
        }

        // Создание экземпляра кнопки.
        const oneTap = new VKID.OneTap();

        // Получение контейнера из разметки.
        const container = document.getElementById('VkIdSdkOneTap');
        // Проверка наличия кнопки в разметке.
        if (container) {
          // Отрисовка кнопки в контейнере с именем приложения APP_NAME, светлой темой и на русском языке.
          oneTap.render({ container: container, scheme: VKID.Scheme.LIGHT, lang: VKID.Languages.RUS })
                //.on(VKID.WidgetEvents.ERROR, handleError); // handleError — какой-либо обработчик ошибки.
              }
              // Обработчик клика.
          const handleClick = () => {
            // Открытие авторизации.
            VKID.Config.init()
            VKID.Auth.login()
          }


  }
}
