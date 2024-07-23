# frozen_string_literal: true

class CreateFriends < ActiveRecord::Migration[7.1]
  def change
    create_table :friends do |t|
      t.integer :vk_uid
      t.text :first_name
      t.text :last_name
      t.text :image_url

      t.timestamps
    end

    add_index :friends, :vk_uid, unique: true
  end
end
