class AddStatetoUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :user_state, :string
  end
end
