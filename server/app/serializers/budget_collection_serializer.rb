class BudgetCollectionSerializer < ActiveModel::Serializer
  attributes(
      :id,
      :amount,
      :user_id,
      :category_id,
      :category
    )
    def category
      object&.category_name
    end
end
