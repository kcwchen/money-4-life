class Notification < ApplicationRecord
  belongs_to :user

  validates :type, presence: true
  validates :message, presence: true
end
