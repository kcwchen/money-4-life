class Budget < ApplicationRecord
  belongs_to :user
  belongs_to :category

  validates :amount, numericality: {greater_than: 0}
end
