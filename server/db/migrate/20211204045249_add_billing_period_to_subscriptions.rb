class AddBillingPeriodToSubscriptions < ActiveRecord::Migration[6.1]
  def change
    add_column :subscriptions, :billing_period, :string
    add_column :subscriptions, :amount, :bigint
  end
end
