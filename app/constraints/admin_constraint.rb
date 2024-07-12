class AdminConstraint
  def matches?(request)
    user = request.env['warden'].user
    user&.admin?
  end
end
