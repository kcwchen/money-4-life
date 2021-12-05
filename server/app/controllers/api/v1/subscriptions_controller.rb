class Api::V1::SubscriptionsController < Api::ApplicationController
  before_action :authenticate_user!, except: [:index]

  def index
    if params[:id]
      subscriptions = Subscription.where(user_id: params[:id]).order(created_at: :asc)
    else
      subscriptions = Subscription.all.order(created_at: :asc)
    end
    render json: subscriptions, each_serializer: SubscriptionCollectionSerializer
  end

  def update

  end
end
