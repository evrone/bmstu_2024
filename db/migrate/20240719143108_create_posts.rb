# frozen_string_literal: true

class CreatePosts < ActiveRecord::Migration[7.1]
  def change
    create_table :posts do |t|
      t.integer :post_id
      t.integer :date
      t.text :image_url
      t.integer :count_likes
      t.integer :count_comments
      t.text :likers
      t.text :commentators
      t.integer :engagement_score, null: true, default: nil
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
