# frozen_string_literal: true

class Vk # rubocop:disable Metrics/ClassLength
  def self.client
    Faraday.new(url: 'https://api.vk.com') do |conn|
      conn.headers['Content-Type'] = 'application/json'
      conn.headers['Accept'] = 'application/json'
      conn.request :json
      conn.response :json
      conn.response :logger
    end
  end

  def self.vkid_client
    Faraday.new(url: 'https://id.vk.com') do |conn|
      conn.headers['Content-Type'] = 'application/json'
      conn.headers['Accept'] = 'application/json'
      conn.request :json
      conn.response :json
      conn.response :logger
    end
  end

  def self.try_request(method, path, body = nil, headers = nil, client: self.client)
    client.send method, path, body, headers
  end

  def self.exchange_code(code, code_verifier, device_id, state)
    resp = try_request(:post,
                       '/oauth2/auth',
                       { grant_type: 'authorization_code',
                         code:,
                         code_verifier:,
                         device_id:,
                         redirect_uri: "#{ENV[HOST]}/auth/vkontakte/callback/",
                         state:,
                         client_id: '51989509' },
                       client: vkid_client)
    resp.body
  end

  def self.refresh_usertokens(refresh_token, device_id, state)
    resp = try_request(:post,
                       '/oauth2/auth',
                       { grant_type: 'refresh_token',
                         refresh_token:,
                         device_id:,
                         state:,
                         client_id: '51989509' },
                       client: vkid_client)
    resp.body
  end

  def self.get_friends(user)
    resp = try_request(:get,
                       '/method/friends.get',
                       { access_token: user.access_token,
                         v: '5.199',
                         fields: 'photo_100 first_name last_name' },
                       { 'Authorization': "Bearer #{user.access_token}" })
    response_hash = resp.body['response']['items']
    friends_id_list_str = response_hash.map(&:to_s).join(', ')

    response_info = try_request(:get,
                                '/method/users.get',
                                { access_token: user.access_token,
                                  v: '5.199',
                                  user_ids: friends_id_list_str,
                                  fields: 'photo_100 first_name last_name' },
                                client:)
    response_info.body['response']['items']
  end

  def self.get_followers(user)
    resp = try_request(:get,
                       'method/users.getFollowers',
                       { access_token: user.access_token,
                         user_id: user.user_id,
                         v: '5.199' },
                       client:)
    resp.body['response']['items']
  end

  # def self.get_data(user)
  #   resp = try_request(:get,
  #                      '/method/wall.get',
  #                      { access_token: user.access_token,
  #                        user_id: user.user_id,
  #                        count: 100,
  #                        v: '5.199',
  #                        filter: 'all' },
  #                      client:)

  #   resp.body['response']['items']
  # end

  def self.get_profile_info(user)
    resp = try_request(:get,
                       '/method/users.get',
                       { access_token: user.access_token,
                         user_ids: user.user_id,
                         v: '5.199',
                         fields: 'first_name last_name photo_100' },
                       client:)
    resp.body['response'][0]
  end

  def self.get_data(user) # rubocop:disable Metrics/AbcSize
    posts = []
    resp = try_request(:get,
                       '/method/wall.get',
                       { access_token: user.access_token,
                         v: '5.199',
                         user_id: user.user_id,
                         count: 100,
                         filter: 'all' },
                       client:)
    post_data_all = resp.body['response']['items']
    post_data_all.each do |post_data|
      like_count = post_data['likes']['count']
      comment_count = post_data['comments']['count']

      post_likers = if like_count.zero?
                      []
                    else
                      get_likers(post_data['id'], like_count.to_i, user)
                    end
      post_commentators = if comment_count.zero?
                            []
                          else
                            get_commentators(post_data['id'], comment_count.to_i, user)
                          end
      post = {
        post_id: post_data['id'],
        date: post_data['date'],
        image_url: get_image_from_post(post_data['attachments']),
        count_likes: post_data['likes']['count'],
        count_comments: post_data['comments']['count'],
        likers: post_likers,
        commentators: post_commentators
      }
      posts << post
    end
    posts
  end

  # проверить утром на работо способность!!!!!!!!!!!
  def self.get_image_from_post(post_media)
    image_url = 'https://a.d-cd.net/8bdfd7cs-960.jpg' # серый квадрат
    post_media.each do |media|
      image_url = find_image_from_media(media)
      break if image_url != 'https://a.d-cd.net/8bdfd7cs-960.jpg' || !image_url.nil? # серый квадрат
    end
    image_url
  end

  def self.find_image_from_media(media) # rubocop:disable Metrics/AbcSize
    case media['type']
    when 'photo'
      return find_image_of_size(media['photo']['sizes'])
    when 'album'
      return find_image_of_size(media['album']['thumb']['sizes'])
    when 'link'
      return find_image_of_size(media['link']['photo']['sizes']) if media['link'].key?('photo')
    when 'video'
      return media['video']['image'][0]['url']
    when 'poll'
      return 'https://www.tgu-dpo.ru/wp-content/uploads/2023/06/%D0%BE%D0%BF%D1%80%D0%BE%D1%81-%D0%B2-Google-%D0%A4%D0%BE%D1%80%D0%BC%D0%B0%D1%85.jpg' # картинка опроса
    end
    nil
  end

  def self.find_image_of_size(photo_from_media)
    photo_from_media.each do |photo|
      return photo['url'] if photo['type'] == 'm'
    end
    nil
  end
  # def self.get_image_from_post(post_media)
  #   photo_found = false
  #   image_url = 'https://a.d-cd.net/8bdfd7cs-960.jpg' # серый квадрат

  #   post_media.each do |media|
  #     if media['type'] == 'photo'
  #       photo_from_media = media['photo']['sizes']

  #       photo_from_media.each do |photo|
  #         if photo['type'] == 'm'
  #           image_url = photo['url']
  #           break
  #         end
  #       end
  #       break
  #     end
  #     # ?
  #     if media['type'] == 'album'
  #       photo_from_media = media['album']['thumb']['sizes']
  #       photo_from_media.each do |photo|
  #         if photo['type'] == 'm'
  #           image_url = photo['url']
  #           break
  #         end
  #       end
  #       break
  #     end
  #     # если тип медиа не картинка и не альбом и еще не подобрано фото
  #     if media['type'] == 'link' && !photo_found
  #       next unless media['link'].key?('photo')

  #       photo_from_media = media['link']['photo']['sizes']

  #       photo_from_media.each do |photo|
  #         next unless photo['type'] == 'm'

  #         image_url = photo['url']
  #         photo_found = true
  #         break
  #       end
  #     end

  #     if media['type'] == 'video' && !photo_found
  #       image_url = media['video']['image'][0]['url']
  #       photo_found = true
  #     end

  #     if media['type'] == 'poll' && !photo_found
  #       image_url = 'https://www.tgu-dpo.ru/wp-content/uploads/2023/06/%D0%BE%D0%BF%D1%80%D0%BE%D1%81-%D0%B2-Google-%D0%A4%D0%BE%D1%80%D0%BC%D0%B0%D1%85.jpg' # картинка опроса
  #       photo_found = true
  #     end
  #   end

  #   image_url
  # end

  def self.get_likers(post_id, like_count, user)
    likers = []
    bundles = like_count / 100 + 1
    (0...bundles).each do |i|
      resp = try_request(:get,
                         '/method/likes.getList',
                         { access_token: user.access_token,
                           v: '5.199',
                           type: 'post',
                           owner_id: user.user_id,
                           item_id: post_id,
                           count: 100,
                           offset: 100 * i,
                           friends_only: 1 },
                         client:)
      current_likers = resp.body['response']['items']
      likers << current_likers
    end
    likers
  end

  def self.get_commentators(post_id, comments_count, user)
    commentators = []
    bundles = comments_count / 100 + 1
    (0...bundles).each do |i|
      resp = try_request(:get,
                         '/method/wall.getComments',
                         { access_token: user.access_token,
                           v: '5.199',
                           owner_id: user.user_id,
                           post_id:,
                           count: 100,
                           offset: 100 * i },
                         client:)
      comments = resp.body['response']['items']
      current_commentators = comments.map { |comment| comment['from_id'] }
      commentators << current_commentators
    end
    commentators
  end
end
