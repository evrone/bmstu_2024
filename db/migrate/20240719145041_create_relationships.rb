# frozen_string_literal: true

class CreateRelationships < ActiveRecord::Migration[7.1]
  def change
    create_table :relationships do |t|
      t.integer :user_id
      t.integer :friend_id
      t.boolean :is_active, default: true

      t.timestamps
    end
  end
end
