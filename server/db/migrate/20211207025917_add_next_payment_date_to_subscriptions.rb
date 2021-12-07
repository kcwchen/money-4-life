class AddNextPaymentDateToSubscriptions < ActiveRecord::Migration[6.1]
  def change
    add_column :subscriptions, :next_payment_date, :datetime
  end
end
