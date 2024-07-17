# frozen_string_literal: true

require 'administrate/base_dashboard'

class UserDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # A hash that describes the type of each field.
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    id: Field::Number,
    email: Field::String,
    password: Field::String.with_options(searchable: false),
    admin: Field::Boolean,
    encrypted_password: Field::String,
    reset_password_token: Field::String,
    reset_password_sent_at: Field::DateTime,
    remember_created_at: Field::DateTime,
    updated_at: Field::DateTime,
    created_at: Field::DateTime
  }.freeze

  # COLLECTION_ATTRIBUTES
  # An array of attributes that will be displayed on the model's index page.
  # By default, Administrate will display all of the attributes.
  # You can customize this by adding, removing, or rearranging items.
  COLLECTION_ATTRIBUTES = %i[
    id
    email
    admin
    updated_at
    created_at
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # An array of attributes that will be displayed on the model's show page.
  # By default, Administrate will display all of the attributes.
  # You can customize this by adding, removing, or rearranging items.
  SHOW_PAGE_ATTRIBUTES = %i[
    id
    email
    admin
    updated_at
    created_at
  ].freeze

  # FORM_ATTRIBUTES
  # An array of attributes that will be displayed on the model's form (`new` and `edit`) pages.
  # By default, Administrate will display all of the attributes.
  # You can customize this by adding, removing, or rearranging items.
  FORM_ATTRIBUTES = %i[
    email
    admin
    password
  ].freeze

  # COLLECTION_FILTERS
  # A hash that defines filters that can be used while searching via the search field.
  # For example, to add an option to search for open resources by typing "open:"
  # in the search field:
  #   COLLECTION_FILTERS = {
  #     open: ->(resources) { resources.where(open: true) }
  #   }.freeze
  COLLECTION_FILTERS = {}.freeze

  # Overwrite this method to customize how users are displayed
  # across all pages of the admin dashboard.
  def display_resource(user)
    "User(id=#{user.id})"
  end
end
