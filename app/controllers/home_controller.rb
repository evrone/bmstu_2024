class HomeController < ApplicationController
  def index
    @code_verifier = SecureRandom.urlsafe_base64(64)
    @code_challenge = Digest::SHA256.base64digest(@code_verifier)
    @state = 'dj29fnsadjsd82'
    @scopes = 'vkid.personal_info friends wall'
  end

  def auth
    @response = HTTParty.post('https://id.vk.com/oauth2/auth',
  body: {
    code: code,
    code_verifier: code_verifier,
    device_id: device_id,
    grant_type: 'authorization_code'
  }
)
  end

end
