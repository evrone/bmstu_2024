# frozen_string_literal: true

class CreatePosts < ActiveRecord::Migration[7.1]
  def change
    create_table :posts do |t|
      t.integer :vk_uid
      t.integer :date
      t.text :image_url
      t.integer 'likes', array: true
      t.integer 'comments', array: true
      t.integer :engagement_score, null: true, default: nil
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end

    add_index :posts, :vk_uid, unique: true
  end
end
