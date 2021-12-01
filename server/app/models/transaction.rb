class Transaction < ApplicationRecord
  belongs_to :user
  belongs_to :account
  belongs_to :subscription, optional: true
  belongs_to :category

  validates :amount, numericality: {greater_than: 0}
  validates :description, presence: true
  validates :transaction_date, presence: true

  def category_name
    c = Category.find(self.category_id)
    c[:name]
  end

  def account_name
    a = Account.find(self.account_id)
    a[:name]
  end
end
