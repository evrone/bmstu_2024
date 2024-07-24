class ChangeRatioTypeInMetric < ActiveRecord::Migration[7.1]
  def change
    change_column :metrics, :comments_likes_ratio, :integer, using: 'comments_likes_ratio::integer'
    change_column :metrics, :target_comments_likes_ratio, :integer, using: 'target_comments_likes_ratio::integer'
  end
end
