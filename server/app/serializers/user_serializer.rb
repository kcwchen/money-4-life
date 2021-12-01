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

  has_many :accounts
  class AccountSerializer < ActiveModel::Serializer
    attributes(
      :id,
      :name
    )

    has_many :transactions
    class TransactionSerializer < ActiveModel::Serializer
      attributes(
        :id,
        :amount,
        :description,
        :transaction_date,
        :is_subscription,
        :category_id,
        :category
      )
      def category
        object&.category_name
      end
    end
  end
end
