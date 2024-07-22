# frozen_string_literal: true

class CreateRelationships < ActiveRecord::Migration[7.1]
  def change
    create_table :relationships do |t|
      t.belongs_to :user
      t.belongs_to :friend
      t.boolean :active, default: true

      t.timestamps

      t.index %i[user_id friend_id]
      t.index %i[friend_id user_id]
    end
  end
end
