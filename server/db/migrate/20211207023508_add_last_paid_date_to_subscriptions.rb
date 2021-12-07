class AddLastPaidDateToSubscriptions < ActiveRecord::Migration[6.1]
  def change
    add_column :subscriptions, :last_paid_date, :datetime
  end
end
