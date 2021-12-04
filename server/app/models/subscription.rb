class Subscription < ApplicationRecord
  belongs_to :user

  has_many :transactions, dependent: :destroy

  validates :name, presence: true
  validates :name, uniqueness: { scope: :user_id, message: "already exists" }
end
