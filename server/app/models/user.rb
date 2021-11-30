class User < ApplicationRecord
  has_secure_password

  has_many :budgets, dependent: :destroy
  has_many :transactions, dependent: :destroy
  has_many :subscriptions, dependent: :destroy
  has_many :accounts, dependent: :destroy
  has_many :notifications, dependent: :destroy

  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
  validates :email, presence: true, uniqueness: true, format: VALID_EMAIL_REGEX
end
