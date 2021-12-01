class Api::V1::BudgetsController < Api::ApplicationController
  before_action :budget_params, except: [:index, :destroy]
  before_action :find_budget, except: [:index, :create]
  before_action :authenticate_user!

  def index
    budgets = Budget.where(user: current_user)
    render json: budgets, each_serializer: BudgetCollectionSerializer
  end

  def create
    budget = Budget.new(amount: @amount, category: @category)
    budget.user = current_user
    if budget.save
      render json: {id: budget.id}
    else
      render json: {errors: budget.errors, status: 422}
    end
  end

  def update
    if @budget.update(amount: @amount, category: @category)
      render json: {id: @budget.id}
    else
      render json: {errors: @budget.errors, status: 422}
    end
  end

  def destroy
    if @budget.destroy
      render json: {status: 200}
    else
      render json: {status: 500}
    end
  end

  private

  def find_budget
    @budget = Budget.find params[:id]
  end

  def budget_params
    @amount = params[:amount] * 100 # amount in cents
    @category = Category.find_by name: params[:category]
    if !@category
      @category = Category.create(name: params[:category])
    end
  end
end
