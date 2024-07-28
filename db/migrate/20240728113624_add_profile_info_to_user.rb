# frozen_string_literal: true

class AddProfileInfoToUser < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :image_url, :string
    add_column :users, :username, :string
  end
end
