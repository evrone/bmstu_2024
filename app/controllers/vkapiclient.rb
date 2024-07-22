class VkApiClient
  def initialize(refresh_token, access_token, user_id)
    @access_token = access_token
    @refresh_token = refresh_token
    @user_id = user_id
    @@version = '5.199'
  end

  # Запрос списка друзей
  def get_friends
    conn = Faraday.new(url: 'https://api.vk.com') do |conn|
      conn.headers['Content-Type'] = 'application/json'
      conn.headers['Accept'] = 'application/json'
      conn.request :json
      conn.response :json
      conn.response :logger
    end

    response = conn.post('/method/friends.get') do |req|
      req.params['access_token'] = @access_token
      req.params['v'] = @@version
      req.params['user_id'] = @user_id
    end
    parsed_response = response.body
  end

  # Запрос списка подписчиков
  def get_followers
    conn = Faraday.new(url: 'https://api.vk.com') do |conn|
      conn.headers['Content-Type'] = 'application/json'
      conn.headers['Accept'] = 'application/json'
      conn.request :json
      conn.response :json
      conn.response :logger
    end
    response = conn.post('/method/users.getFollowers') do |req|
      req.params['access_token'] = @access_token
      req.params['v'] = @@version
      req.params['user_id'] = @user_id
    end

    parsed_response = response.body
    parsed_response['response']['items']
  end

  # Запрос постов со стены и засовывание их базу данных

  def get_data
    conn = Faraday.new(url: 'https://api.vk.com') do |conn|
      conn.headers['Content-Type'] = 'application/json'
      conn.headers['Accept'] = 'application/json'
      conn.request :json
      conn.response :json
      conn.response :logger
    end

    response = conn.post('/method/wall.get') do |req|
      req.params['access_token'] = @access_token
      req.params['v'] = @@version
      req.params['user_id'] = @user_id
      req.params['count'] = 100
      req.params['filter'] = 'all'
    end
    post_data = response.body['response']['items']
  end
  def get_profile_info()
    conn = Faraday.new(url: 'https://api.vk.com') do |conn|
      conn.headers['Content-Type'] = 'application/json'
      conn.headers['Accept'] = 'application/json'
      conn.request :json
      conn.response :json
      conn.response :logger
    end

    response = conn.post('/method/users.get') do |req|
      req.params['access_token'] = @access_token
      req.params['user_ids'] = @user_id
      req.params['fields'] = 'first_name last_name'
      req.params['v'] = @@version
    end
    user_profile_data = response.body['response'][0]
  end
end
