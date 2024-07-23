# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_07_19_150646) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "friends", force: :cascade do |t|
    t.integer "vk_uid"
    t.text "first_name"
    t.text "last_name"
    t.text "image_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["vk_uid"], name: "index_friends_on_vk_uid", unique: true
  end

  create_table "metrics", force: :cascade do |t|
    t.integer "average_likes"
    t.integer "target_likes"
    t.integer "average_comments"
    t.integer "target_comments"
    t.integer "comments_likes_ratio"
    t.integer "target_comments_likes_ratio"
    t.decimal "audience_score"
    t.integer "average_engagement_rate"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_metrics_on_user_id"
  end

  create_table "posts", force: :cascade do |t|
    t.integer "vk_uid"
    t.integer "date"
    t.text "image_url"
    t.integer "likes", array: true
    t.integer "comments", array: true
    t.integer "engagement_rate"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_posts_on_user_id"
    t.index ["vk_uid"], name: "index_posts_on_vk_uid", unique: true
  end

  create_table "relationships", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "friend_id"
    t.boolean "active", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["friend_id", "user_id"], name: "index_relationships_on_friend_id_and_user_id"
    t.index ["friend_id"], name: "index_relationships_on_friend_id"
    t.index ["user_id", "friend_id"], name: "index_relationships_on_user_id_and_friend_id"
    t.index ["user_id"], name: "index_relationships_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "admin", default: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "metrics", "users"
  add_foreign_key "posts", "users"
end
