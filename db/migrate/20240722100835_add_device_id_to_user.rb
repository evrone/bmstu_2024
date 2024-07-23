class AddDeviceIdToUser < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :user_device_id, :string
  end
end
