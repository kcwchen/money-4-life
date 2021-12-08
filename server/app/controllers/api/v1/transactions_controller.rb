class Api::V1::TransactionsController < Api::ApplicationController
  before_action :transaction_params, except: [:index, :destroy]
  before_action :find_transaction, except: [:index, :create]
  before_action :authenticate_user!, except: [:index]

  def index
    if params[:id]
      transactions = Transaction.where(user_id: params[:id]).order(transaction_date: :desc)
    else
      transactions = Transaction.all.order(transaction_date: :desc)
    end
    render json: transactions, each_serializer: TransactionCollectionSerializer
  end

  def create

    if params[:billing_period] == 'weekly'
      next_payment_date = params[:transaction_date].to_date + 1.week
    elsif params[:billing_period] == 'biweekly'
      next_payment_date = params[:transaction_date].to_date + 2.week
    elsif params[:billing_period] == 'monthly'
      next_payment_date = params[:transaction_date].to_date + 1.month
    elsif params[:billing_period] == 'annually'
      next_payment_date = params[:transaction_date].to_date + 1.year
    end

    if params[:is_subscription] == 'true'
      @subscription = Subscription.find_by name: params[:subscription_name].titleize, user: current_user
      if !@subscription
        @subscription = Subscription.create(name: params[:subscription_name].titleize, billing_period: params[:billing_period].titleize, amount: @amount, user: current_user, last_paid_date: params[:transaction_date], next_payment_date: next_payment_date)
      else
        @subscription.update(billing_period: params[:billing_period].titleize, amount: @amount, is_active: true, last_paid_date: params[:transaction_date], next_payment_date: next_payment_date)
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
    @amount = params[:amount].to_i
    @category = Category.find_by name: params[:category].titleize
    @account = Account.find_by name: params[:account].titleize, user: current_user
    if !@category
      @category = Category.create(name: params[:category].titleize)
    end
    if !@account
      @account = Account.create(name: params[:account].titleize, user: current_user)
    end
  end

  def find_transaction
    @transaction = Transaction.find params[:id]
  end
end
