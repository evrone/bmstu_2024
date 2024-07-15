# frozen_string_literal: true

class ApplicationController < ActionController::Base
  around_action :switch_locale

  private

  def switch_locale(&action)
    locale = params[:locale] || I18n.default_locale
    I18n.with_locale locale, &action
  end

  # # проверка есть ли нужный язык, скорее всего не понадобится
  # def locale_from_url
  #   locale = params[:locale]
  #   return locale if I18n.available_locales.map(&:to_s).include?(locale)
  #   nil
  # end
  # сохранение языка между страницами
  def default_url_options
    { locale: I18n.locale }
  end
end
