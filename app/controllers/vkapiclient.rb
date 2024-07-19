class VkApiClient
    def initialize(refresh_token,access_token, user_id)
      @access_token=access_token
      @refresh_token = refresh_token
      @user_id=user_id
      @@version='5.199'
    end
    #Запрос списка друзей
    def get_friends
      conn = Faraday.new(url: 'https://api.vk.com') do |conn|
        conn.headers['Content-Type'] = 'application/json'
        conn.headers['Accept'] = 'application/json'
        conn.request :json
        conn.response :json
        conn.response :logger
      end
  
      response=conn.post('/method/friends.get') do |req|
        req.params['access_token'] = @access_token
        req.params['v'] = @@version
        req.params['user_id'] = @user_id
      end
      parsed_response = response.body 
    end
    #Запрос списка подписчиков
    def get_followers
      conn = Faraday.new(url: 'https://api.vk.com') do |conn|
        conn.headers['Content-Type'] = 'application/json'
        conn.headers['Accept'] = 'application/json'
        conn.request :json
        conn.response :json
        conn.response :logger
      end
      response=conn.post('/method/users.getFollowers') do |req|
        req.params['access_token'] = @access_token
        req.params['v'] = @@version
        req.params['user_id'] = @user_id
      end
  
      parsed_response = response.body
      followers_list = parsed_response['response']['items']
      followers_list
    end
  
    #Запрос постов со стены и засовывание их базу данных 
    def get_data
      conn = Faraday.new(url: 'https://api.vk.com') do |conn|
        conn.headers['Content-Type'] = 'application/json'
        conn.headers['Accept'] = 'application/json'
        conn.request :json
        conn.response :json
        conn.response :logger
      end
  
      response=conn.post('/method/wall.get') do |req|
        req.params['access_token'] = @access_token
        req.params['v'] = @@version
        req.params['user_id'] = @user_id
        req.params['count']=100
        req.params['filter']='all'
      end
      post_data = response.body['response']['items']
      
      post_data.each do |post_data|
        
        post_likers=get_likers(post_data['id'])&.join(, )
        post_commentators=get_commentators(post_data['id'])&.join(, )
  
        post=Post.new(
          post_id: post_data['id'],
          date: post_data['date'],
          image_url: get_image_from_post(post_data['attachments']),
          count_likes: post_data['likes']['count'],
          count_comments: post_data['comments']['count'],
          likers: post_likers,
          commentators: post_commentators
        )
        puts "*************************"
        if post.save
          puts "Post #{post.post_id} saved successfully."
        else
          puts "Failed to save post #{post.post_id}: #{post.errors.full_messages.join(', ')}"
        end
      end
    end
  
    def get_image_from_post(post_media)
      photo_found=false
      image_url="https://a.d-cd.net/8bdfd7cs-960.jpg"#серый квадрат
  
      post_media.each do |media|
        if media['type']=='photo'
          photo_from_media=media['photo']['sizes']
  
          photo_from_media.each do |photo|
            if photo['type']=='m'
              image_url=photo['url']
              break
            end
          end
          break
        end
        #?
        if media['type']='album'
          photo_from_media=media['album']['thumb']['sizes']
          photo_from_media.each do |photo|
            if photo['type']=='m'
              image_url=photo['url']
              break
            end
          end
          break
        end
        #если тип медиа не картинка и не альбом и еще не подобрано фото
        if media['type']=='link' && !photo_found  
          if media['link'].key?('photo')
            photo_from_media=media['link']['photo']['sizes']  
          else
            next
          end
  
          photo_from_media.each do |photo|
            if photo['type']=='m'
              image_url=photo['url']
              photo_found=true
              break
            end
          end
        end
  
        if media['type']=='video' && !photo_found
          image_url=media['video']['image'][0]['url']
          photo_found=true
        end
        #?
        if media['type']=='poll' && !photo_found
          photo_from_media=media['poll']['photo']['sizes']
          photo_from_media.each do |photo|
            if photo['type']=='m'
              image_url=photo['url']
              break
            end
          end
          photo_found=true
        end
  
      end
  
      image_url
    end
  
    #запрос списка лайкнувших посты
    def get_likers(post_id)
      likers = []
      offset = 0
  
      conn = Faraday.new(url: 'https://api.vk.com') do |conn|
        conn.headers['Content-Type'] = 'application/json'
        conn.headers['Accept'] = 'application/json'
        conn.request :json
        conn.response :json
        conn.response :logger
      end
  
      loop do
        response=conn.post('/method/likes.getList') do |req|
          req.params['access_token'] = @access_token
          req.params['v'] = @@version
          req.params['type']='post'
          req.params['owner_id']=@user_id
          req.params['item_id']=post_id
          req.params['count']=100
          req.params['offset']=offset
          req.params['friends_only'] = 1
        end
  
        current_likers = response.body['response']['items']
        break if current_likers.empty?
        likers += current_likers
        offset+=100
      end
      likers
    end
    #запрос списка комментевших посты
    def get_commentators(post_id)
      commentators=[]
      offset = 0
  
      conn = Faraday.new(url: 'https://api.vk.com') do |conn|
        conn.headers['Content-Type'] = 'application/json'
        conn.headers['Accept'] = 'application/json'
        conn.request :json
        conn.response :json
        conn.response :logger
      end
  
      loop do
        response=conn.post('/method/wall.getComments') do |req|
          req.params['access_token'] = @access_token
          req.params['v'] = @@version
          req.params['owner_id']=@user_id
          req.params['post_id']=post_id
          req.params['count']=100
          req.params['offset']=offset
        end
  
        comments=response.body['response']['items']
        break if comments.empty?
        current_commentators=comments.map { |comment| comment['from_id'] }
        commentators+=current_commentators
        offset+=100
      end
      
      commentators
    end
  end