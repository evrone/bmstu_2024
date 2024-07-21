# frozen_string_literal: true

user = User.create!(email: 'user@example.com', password: 'password')

20.times do |i|
  friend = Friend.create!(friend_id: i + 1, first_name: 'Name', last_name: 'Surname', image_url: "http://example.com/image#{i + 1}.jpg")
  Relationship.create!(user:, friend:)
end

Post.create!(
  post_id: 1,
  date: Time.now.to_i,
  image_url: 'http://example.com/image1.jpg',
  count_likes: 5,
  count_comments: 3,
  likers: '[4, 2, 18, 16, 20]',
  commentators: '[1, 4, 18]',
  user:
)

Post.create!(
  post_id: 2,
  date: Time.now.to_i,
  image_url: 'http://example.com/image2.jpg',
  count_likes: 8,
  count_comments: 6,
  likers: '[2, 18, 5, 9, 12, 6, 10, 3]',
  commentators: '[6, 2, 3, 1, 4, 5]',
  user:
)

Post.create!(
  post_id: 3,
  date: Time.now.to_i,
  image_url: 'http://example.com/image3.jpg',
  count_likes: 3,
  count_comments: 2,
  likers: '[1, 4, 6]',
  commentators: '[19, 15]',
  user:
)
