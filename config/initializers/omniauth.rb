OmniAuth.config.full_host = ENV['PROXY_HOST']

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :instagram, ENV['INSTAGRAM_ID'], ENV['INSTAGRAM_SECRET'], {callback_path: "/auth/instagram/callback/",
  scope:'user_profile,user_media'}
end