class UserSerializer < ActiveModel::Serializer
  attributes(
    :id,
    :email,
    :total_budget
  )

  def total_budget
    object&.user_budget_total
  end

  has_many :budgets
  class BudgetSerializer < ActiveModel::Serializer
    attributes(
      :id,
      :amount,
      :category_id,
      :category
    )
    def category
      object&.category_name
    end
  end
end
