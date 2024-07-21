# frozen_string_literal: true

class MetricsController < ApplicationController
  def get
    user = User.find(params[:user_id])
    metric = user.metric || build_metric
    render json: metric
  end

  def update
    user = User.find(params[:user_id])
    user.update_metrics
  end
end
