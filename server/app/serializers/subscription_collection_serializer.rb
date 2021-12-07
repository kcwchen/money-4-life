class SubscriptionCollectionSerializer < ActiveModel::Serializer
  attributes(
      :id,
      :name,
      :amount,
      :billing_period,
      :last_paid_date,
      :next_payment_date,
      :is_active,
      :user_id,
      :created_at,
      :updated_at,
    )
end
