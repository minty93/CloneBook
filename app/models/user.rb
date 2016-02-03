class User < ActiveRecord::Base
  include PgSearch

  multisearchable :against => [:email, :fname, :lname]

  PgSearch.multisearch_options = {
  :using => [:tsearch]
  }

  validates :session_token, :fname, :lname, :email, :password_digest, presence: true
  validates :gender, inclusion: %w(male female)
  validates :email, uniqueness: true
  validates :password, length: {minimum: 6, allow_nil: true}

  has_attached_file :profile_pic, default_url: "http://s29.postimg.org/mt68s3j5z/star_wars_profile_pic.jpg"
  validates_attachment_content_type :profile_pic, content_type: /\Aimage\/.*\Z/

  has_attached_file :cover_pic, default_url: "http://s12.postimg.org/5jv8metod/star_wars_cover.jpg"
  validates_attachment_content_type :cover_pic, content_type: /\Aimage\/.*\Z/

  after_initialize :ensure_session_token

  attr_reader :password

  has_many(:authored_posts, foreign_key: :author_id, primary_key: :id, class_name: "Post")
  has_many(:photos, foreign_key: :user_id, primary_key: :id, class_name: "Photo")

  has_many(:received_posts, foreign_key: :profile_id, primary_key: :id, class_name: "Post")

  def self.find_by_credentials(email,password)
    user = User.find_by_email(email)
    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

end
