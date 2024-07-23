# frozen_string_literal: true

class CreateMetrics < ActiveRecord::Migration[7.1]
  def change
    create_table :metrics do |t|
      t.integer :average_likes
      t.integer :target_likes
      t.integer :average_comments
      t.integer :target_comments
      t.string :comments_likes_ratio
      t.string :target_comments_likes_ratio
      t.decimal :audience_score
      t.integer :average_engagement_rate
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
