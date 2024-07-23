# frozen_string_literal: true

Post.destroy_all
Relationship.destroy_all
Friend.destroy_all
Metric.destroy_all
User.destroy_all

user = User.create!(email: 'test@example.com', password: 'password')

20.times do |i|
  friend = Friend.create!(vk_uid: i + 1, first_name: 'Name', last_name: 'Surname', image_url: "https://example.com/image#{i + 1}.jpg")
  Relationship.create!(user:, friend:)
end

Post.create!(
  vk_uid: 1,
  date: Time.now.to_i,
  image_url: 'https://example.com/image1.jpg',
  likes: [4, 2, 18, 16, 20],
  comments: [1, 4, 18],
  user:
)

Post.create!(
  vk_uid: 2,
  date: Time.now.to_i,
  image_url: 'https://example.com/image2.jpg',
  likes: [2, 18, 5, 9, 12, 6, 10, 3],
  comments: [6, 2, 3, 1, 4, 5],
  user:
)

Post.create!(
  vk_uid: 3,
  date: Time.now.to_i,
  image_url: 'https://example.com/image3.jpg',
  likes: [1, 4, 6],
  comments: [19, 15],
  user:
)
