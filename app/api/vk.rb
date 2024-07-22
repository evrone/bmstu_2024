module Vk
  # def initialize(refresh_token, access_token, user_id)
  #   @access_token = access_token
  #   @refresh_token = refresh_token
  #   @user_id = user_id
  #   @@version = '5.199'
  # end

  def client
    Faraday.new(url: 'https://api.vk.com') do |conn|
      conn.headers['Content-Type'] = 'application/json'
      conn.headers['Accept'] = 'application/json'
      conn.request :json
      conn.response :json
      conn.response :logger
    end
  end

  def vkid_client
    Faraday.new(url: 'https://id.vk.com') do |conn|
      conn.headers['Content-Type'] = 'application/json'
      conn.headers['Accept'] = 'application/json'
      conn.request :json
      conn.response :json
      conn.response :logger
    end
  end

  def try_request(method, path, body = nil, headers = nil, client: self.client)
    client.send method, path, body, headers
  end

  def exchange_code(code, code_verifier, device_id, state)
    resp = try_request(:post,
                       '/oauth2/auth',
                       { grant_type: 'authorization_code',
                         code:,
                         code_verifier:,
                         device_id:,
                         redirect_uri: 'http://localhost/auth/vkontakte/callback/',
                         state:,
                         client_id: '51989509' },
                       client: vkid_client)
    resp.body
  end

  # Запрос списка друзей
  def get_friends(user)
    # response = client.post('/method/friends.get') do |req|
    #   req.params['access_token'] = @access_token
    #   req.params['v'] = @@version
    #   req.params['user_id'] = @user_id
    # end
    # parsed_response = response.body

    resp = try_request(:get,
                       '/method/friends.get',
                       { access_token: },
                       { 'Authorization': "Bearer #{user.access_token}" })
    resp.body
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

  def get_profile_info
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

  post_data.each do |post_data|
    post_likers = get_likers(post_data['id'])
    post_commentators = get_commentators(post_data['id'])

    post = Post.new(
      post_id: post_data['id'],
      date: post_data['date'],
      image_url: get_image_from_post(post_data['attachments']),
      count_likes: post_data['likes']['count'],
      count_comments: post_data['comments']['count'],
      likers: post_likers,
      commentators: post_commentators
    )
    puts '*************************'
    if post.save
      puts "Post #{post.post_id} saved successfully."
    else
      puts "Failed to save post #{post.post_id}: #{post.errors.full_messages.join(', ')}"
    end
  end
end

def get_image_from_post(post_media)
  photo_found = false
  image_url = 'https://a.d-cd.net/8bdfd7cs-960.jpg' # серый квадрат

  post_media.each do |media|
    if media['type'] == 'photo'
      photo_from_media = media['photo']['sizes']

      photo_from_media.each do |photo|
        if photo['type'] == 'm'
          image_url = photo['url']
          break
        end
      end
      break
    end
    # ?
    if media['type'] = 'album'
      photo_from_media = media['album']['thumb']['sizes']
      photo_from_media.each do |photo|
        if photo['type'] == 'm'
          image_url = photo['url']
          break
        end
      end
      break
    end
    # если тип медиа не картинка и не альбом и еще не подобрано фото
    if media['type'] == 'link' && !photo_found
      next unless media['link'].key?('photo')

      photo_from_media = media['link']['photo']['sizes']

      photo_from_media.each do |photo|
        next unless photo['type'] == 'm'

        image_url = photo['url']
        photo_found = true
        break
      end
    end

    if media['type'] == 'video' && !photo_found
      image_url = media['video']['image'][0]['url']
      photo_found = true
    end
    # ?
    next unless media['type'] == 'poll' && !photo_found

    photo_from_media = media['poll']['photo']['sizes']
    photo_from_media.each do |photo|
      if photo['type'] == 'm'
        image_url = photo['url']
        break
      end
    end
    photo_found = true
  end

  image_url
end

# запрос списка лайкнувших посты
def get_likers(post_id, like_count)
  likers = []
  offset = 0

  conn = Faraday.new(url: 'https://api.vk.com') do |conn|
    conn.headers['Content-Type'] = 'application/json'
    conn.headers['Accept'] = 'application/json'
    conn.request :json
    conn.response :json
    conn.response :logger
  end

  bundles = like_count / 100 + 1

  (0...bundles).each do |i|
    get_likes(post_id, 100 * i)
  end

  # loop do
  #   response=conn.post('/method/likes.getList') do |req|
  #     req.params['access_token'] = @access_token
  #     req.params['v'] = @@version
  #     req.params['type']='post'
  #     req.params['owner_id']=@user_id
  #     req.params['item_id']=post_id
  #     req.params['count']=100
  #     req.params['offset']=offset
  #     req.params['friends_only'] = 1
  #   end

  #   current_likers = response.body['response']['items']
  #   break if current_likers.empty?
  #   likers += current_likers
  #   offset+=100
  # end
  likers
end

# запрос списка комментевших посты
def get_commentators(post_id)
  commentators = []
  offset = 0

  conn = Faraday.new(url: 'https://api.vk.com') do |conn|
    conn.headers['Content-Type'] = 'application/json'
    conn.headers['Accept'] = 'application/json'
    conn.request :json
    conn.response :json
    conn.response :logger
  end

  loop do
    response = conn.post('/method/wall.getComments') do |req|
      req.params['access_token'] = @access_token
      req.params['v'] = @@version
      req.params['owner_id'] = @user_id
      req.params['post_id'] = post_id
      req.params['count'] = 100
      req.params['offset'] = offset
    end

    comments = response.body['response']['items']
    break if comments.empty?

    current_commentators = comments.map { |comment| comment['from_id'] }
    commentators += current_commentators
    offset += 100
  end

  commentators
end
