class Category < ApplicationRecord
  has_one :budget
  has_one :transaction
end
