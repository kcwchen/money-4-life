class BudgetCollectionSerializer < ActiveModel::Serializer
  attributes(
    :id,
    :amount,
    :category_id,
  )
end
