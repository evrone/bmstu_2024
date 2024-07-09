OmniAuth.config.full_host = ENV['HOST']

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :instagram, ENV['INSTAGRAM_CLIENT_ID'], ENV['INSTAGRAM_CLIENT_SECRET'], { callback_path: "/auth/instagram/callback/", scope:'user_profile,user_media' }
end