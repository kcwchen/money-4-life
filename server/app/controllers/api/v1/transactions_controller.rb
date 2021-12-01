class Api::V1::TransactionsController < Api::ApplicationController
  before_action :transaction_params, except: [:index]

  def index

  end

  def create
    transaction = Transaction.new(amount: @amount, description: params[:description], transaction_date: params[:transaction_date], category: @category, account: @account)
    transaction.user = current_user
    if transaction.save
      render json: {id: transaction.id}
    else
      render json: {errors: transaction.errors, status: 422}
    end
  end

  private

  def transaction_params
    @amount = params[:amount] * 100 # amount in cents
    @category = Category.find_by name: params[:category]
    @account = Account.find_by name: params[:account], user: current_user
    if !@category
      @category = Category.create(name: params[:category])
    end
    if !@account
      @account = Account.create(name: params[:account], user: current_user)
    end
  end
end
