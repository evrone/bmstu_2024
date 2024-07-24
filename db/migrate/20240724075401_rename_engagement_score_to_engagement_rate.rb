class RenameEngagementScoreToEngagementRate < ActiveRecord::Migration[7.1]
  def change
    rename_column :metrics, :average_engagement_score, :average_engagement_rate
    rename_column :posts, :engagement_score, :engagement_rate
  end
end
