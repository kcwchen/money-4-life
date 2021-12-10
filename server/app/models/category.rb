class Category < ApplicationRecord
  has_one :budget
  #has_one :transaction
  has_one :owner, foreign_key: "category_id", class_name: "Transaction"

  validates :name, presence: true, uniqueness: true
end
