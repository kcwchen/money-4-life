class TransactionCollectionSerializer < ActiveModel::Serializer
  attributes(
    :id,
    :amount,
    :description,
    :transaction_date,
    :is_subscription,
    :account_id,
    :account,
    :category_id,
    :category
  )
  def category
    object&.category_name
  end

  def account
    object&.account_name
  end
end
