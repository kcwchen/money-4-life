class UserSerializer < ActiveModel::Serializer
  attributes(
    :id,
    :first_name,
    :last_name,
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
  end

  has_many :subscriptions
  class SubscriptionSerializer < ActiveModel::Serializer
    attributes(
      :id,
      :name,
      :amount,
      :billing_period,
      :is_active,
      :user_id
    )
  end

  has_many :transactions
  class TransactionSerializer < ActiveModel::Serializer
    attributes(
      :id,
      :amount,
      :description,
      :transaction_date,
      :is_subscription,
      :user_id,
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
end
