class Api::V1::SubscriptionsController < Api::ApplicationController
  before_action :authenticate_user!, except: [:index]

  def index
    subscriptions = Subscription.all.order(created_at: :asc)
    render json: subscriptions, each_serializer: SubscriptionCollectionSerializer
  end

  def update

  end
end
