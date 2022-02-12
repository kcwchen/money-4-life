# config/initializers/cors.rb

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'https://money-4-life-app.vercel.app/', 'https://money-4-life.vercel.app/'
    resource(
      '/api/*',
      headers: :any,
      credentials: true,
      methods: [:get, :post, :patch, :put, :delete, :options]
    )
  end
end
