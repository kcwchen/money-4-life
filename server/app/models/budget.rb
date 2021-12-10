class Budget < ApplicationRecord
  belongs_to :user
  belongs_to :category

  validates :amount, numericality: {greater_than: 0}
  validates :category_id, uniqueness: { scope: :user_id, message: "has already been set" }

  def category_name
    c = Category.find(self.category_id)
    c[:name]
  end
end
