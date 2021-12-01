# config/initializers/cors.rb

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'localhost:9999', 'localhost:5550', 'localhost:3001' # whitelist domains
    # you can add whichever domains you want to the above list that you will allow to make requests to the api
    # origins '*' allows everyone to access
    resource(
      '/api/*', # limit requests to paths that look like localhost:3000/api
      headers: :any,
      credentials: true, # we're sending cookies with CORS later, so we need this option
      methods: [:get, :post, :patch, :put, :delete, :options]
      # allow all these http verbs
      # options verb is being used under the hood for CORS to work
    )
  end
end
