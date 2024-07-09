module UserConcern
  extend ActiveSupport::Concern

  def get_profile_info
    url_template = 'https://i.instagram.com/api/v1/users/web_profile_info/?username=%s'
    user_agent_header = 'Instagram 76.0.0.15.395 Android (24/7.0; 640dpi; 1440x2560; samsung; SM-G930F; herolte; samsungexynos8890; en_US; 138226743)'

    url = sprintf(url_template, self.username)
    json_response = URI.open(url, "User-Agent" => user_agent_header).read
    response_data = JSON.parse(json_response)

    status = response_data.dig('status')
    user_data = response_data.dig('data', 'user')

    if status == 'ok' and user_data
      {
        status: 'ok',
        username: user_data['username'],
        followers_count: user_data.dig('edge_followed_by', 'count'),
        following_count: user_data.dig('edge_follow', 'count'),
        avatar: user_data['profile_pic_url_hd']
      }
    else
      {
        status: 'fail',
      }
    end
  end
end
