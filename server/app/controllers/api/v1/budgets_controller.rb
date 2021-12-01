class Api::V1::BudgetsController < Api::ApplicationController

  def index

  end

  def create
    amount = params[:amount] * 100 # amount in cents
    category = Category.find_by name: params[:category]
    if !category
      category = Category.create(name: params[:category])
    end
    budget = Budget.new(amount: amount, category: category)
    budget.user = current_user
    byebug
    if budget.save
      render json: {id: budget.id}
    else
      render json: {errors: budget.errors, status: 422}
    end
  end
end
