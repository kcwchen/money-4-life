class Api::V1::SubscriptionsController < Api::ApplicationController
  before_action :authenticate_user!, except: [:index]
  before_action :find_subscription, except: [:index]
  before_action :subscription_params, except: [:index]

  def index
    if params[:order_by]
      order_by = params[:order_by]
    else
      order_by = 'created_at'
    end

    if params[:id] && params[:is_active]
      if params[:is_active] === 'true'
       subscriptions = Subscription.where(user_id: params[:id], is_active: true).order("#{order_by}": :asc)
      elsif params[:is_active] === 'false'
        subscriptions = Subscription.where(user_id: params[:id], is_active: false).order("#{order_by}": :asc)
      elsif params[:id]
        subscriptions = Subscription.where(user_id: params[:id]).order("#{order_by}": :asc)
      end
    else
      subscriptions = Subscription.all.order("#{order_by}": :asc)
    end
    render json: subscriptions, each_serializer: SubscriptionCollectionSerializer
  end

  def update
    if @is_active == 'false'
      if @subscription.update(is_active: false)
        render json: {id: @subscription.id}
      else
        render json: {errors: @subscription.errors, status: 422}
      end
    else @is_active == 'true'
      if @subscription.update(is_active: true)
        render json: {id: @subscription.id}
      else
        render json: {errors: @subscription.errors, status: 422}
      end
    end
  end

  private
  
  def find_subscription
    @subscription = Subscription.find params[:id]
  end

  def subscription_params
    @is_active = params[:is_active]
  end
end
