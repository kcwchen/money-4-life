class Subscription < ApplicationRecord
  belongs_to :user

  has_many :transactions, dependent: :destroy

  validates :name, presence: true
  validates :name, uniqueness: { scope: :user_id, message: "already exists" }

  # def next_payment_date
  #   if self.billing_period == 'Weekly'
  #     next_payment_date = self.last_paid_date + 1.week
  #   elsif self.billing_period == 'Bi-Weekly'
  #     next_payment_date = self.last_paid_date + 2.week
  #   elsif self.billing_period == 'Monthly'
  #     next_payment_date = self.last_paid_date + 1.month
  #   elsif self.billing_period == 'Annually'
  #     next_payment_date = self.last_paid_date + 1.year
  #   end
  #   next_payment_date
  # end
end
