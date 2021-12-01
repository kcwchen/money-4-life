class Api::ApplicationController < ApplicationController
  skip_before_action :verify_authenticity_token

  def not_found
    render json: {errors: [{type: "Not Found"}], status: 404}
  end
end
