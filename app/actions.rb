# Homepage (Root path)


get '/' do
  @contacts = Contact.all
  erb :index
end

get '/new' do
  
end

get '/edit/:id' do
end








