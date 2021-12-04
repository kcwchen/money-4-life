class SubscriptionCollectionSerializer < ActiveModel::Serializer
  attributes(
      :id,
      :name,
      :amount,
      :billing_period,
      :is_active,
      :user_id,
      :created_at,
      :updated_at
    )
end
