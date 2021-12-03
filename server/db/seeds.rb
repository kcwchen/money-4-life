# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Account.destroy_all
Category.destroy_all
Transaction.destroy_all
Budget.destroy_all
User.destroy_all

PASSWORD = '123'

User.create(
  first_name: 'Kevin',
  last_name: 'Chen',
  email: 'chen.kcw@gmail.com',
  password: PASSWORD
)

User.create(
  first_name: 'Floof',
  last_name: 'Chen',
  email: 'floof@chen.com',
  password: PASSWORD
)

users = User.all

Category.create(
  name: 'Food'
)
Category.create(
  name: 'Entertainment'
)
Category.create(
  name: 'Recreation'
)
Category.create(
  name: 'Clothing'
)
Category.create(
  name: 'Rent'
)
Category.create(
  name: 'Medical'
)
Category.create(
  name: 'Communications'
)
Category.create(
  name: 'Transportation'
)
Category.create(
  name: 'Pets'
)
Category.create(
  name: 'Personal Care'
)

categories = Category.all

20.times do
  b = Budget.create(
    amount: rand(1..100000),
    category: categories.sample,
    user: users.sample
  )
end

5.times do
  a = Account.create(
    name: Faker::Subscription.payment_method,
    user: users.sample
  )
end

accounts = Account.all

100.times do
  date_of_transaction = Faker::Date.backward(days: 365)

  t = Transaction.create(
    amount: rand(1..20000),
    description: Faker::Commerce.product_name,
    transaction_date: date_of_transaction,
    user: users.sample,
    category: categories.sample,
    account: accounts.sample
  )
end

budgets = Budget.all
transactions = Transaction.all

puts "Transactions: #{transactions.count}"
puts "Budgets: #{budgets.count}"
puts "Accounts: #{accounts.count}"
puts "Categories: #{categories.count}"
puts "Users: #{users.count}"