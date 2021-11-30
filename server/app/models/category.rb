class Category < ApplicationRecord
  has_one :budget
  has_one :transaction

  validates :name, presence: true
end
