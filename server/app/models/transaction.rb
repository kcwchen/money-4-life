class Transaction < ApplicationRecord
  belongs_to :user
  belongs_to :account
  belongs_to :subscription
  belongs_to :category

  validates :amount, numericality: {greater_than: 0}
  validates :description, presence: true
  validates :transaction_date, presence: true
end
