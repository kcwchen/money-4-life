class Api::V1::TransactionsController < Api::ApplicationController
  before_action :transaction_params, except: [:index, :destroy]
  before_action :find_transaction, except: [:index, :create]
  before_action :authenticate_user!, except: [:index]

  def index
    transactions = Transaction.all.order(transaction_date: :desc)
    render json: transactions, each_serializer: TransactionCollectionSerializer
  end

  def create
    if params[:is_subscription]
      @subscription = Subscription.find_by name: params[:subscription_name].capitalize, user: current_user
      if !@subscription
        @subscription = Subscription.create(name: params[:subscription_name].capitalize, billing_period: params[:billing_period], amount: @amount, user: current_user)
      end
      transaction = Transaction.new(amount: @amount, description: params[:description], transaction_date: params[:transaction_date], category: @category, account: @account, subscription: @subscription, is_subscription: true)
    else
      transaction = Transaction.new(amount: @amount, description: params[:description], transaction_date: params[:transaction_date], category: @category, account: @account)
    end
    transaction.user = current_user
    if transaction.save
      render json: {id: transaction.id}
    else
      render json: {errors: transaction.errors, status: 422}
    end
  end

  def update
    if @transaction.update(amount: @amount, description: params[:description], transaction_date: params[:transaction_date], category: @category, account: @account)
      render json: {id: @transaction.id}
    else
      render json: {errors: @transaction.errors, status: 422}
    end
  end

  def destroy
    if @transaction.destroy
      render json: {status:200}
    else
      render json: {status:500}
    end
  end

  private

  def transaction_params
    @amount = params[:amount] * 100 # amount in cents
    @category = Category.find_by name: params[:category].capitalize
    @account = Account.find_by name: params[:account].capitalize, user: current_user
    if !@category
      @category = Category.create(name: params[:category].capitalize)
    end
    if !@account
      @account = Account.create(name: params[:account].capitalize, user: current_user)
    end
  end

  def find_transaction
    @transaction = Transaction.find params[:id]
  end
end
