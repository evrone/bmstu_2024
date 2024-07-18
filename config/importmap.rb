# frozen_string_literal: true

# Pin npm packages by running ./bin/importmap

pin 'application'
pin_all_from 'app/javascript/controllers', under: 'controllers'

pin '@hotwired/stimulus', to: '@hotwired--stimulus.js' # @3.2.2
pin '@stimulus/webpack-helpers', to: '@stimulus--webpack-helpers.js' # @2.0.0
pin '@hotwired/turbo', to: '@hotwired--turbo.js' # @8.0.4
pin '@rails/actioncable/src', to: '@rails--actioncable--src.js' # @7.1.3
pin '@hotwired/turbo-rails', to: '@hotwired--turbo-rails.js' # @8.0.4

# pin '@hotwired/stimulus-loading', to: 'stimulus-loading.js'
