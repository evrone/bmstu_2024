class AddAccessTokenExpirationTimeToUser < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :access_token_expiration_time, :datetime
  end
end
