# Homepage (Root path)


get '/' do
  @contacts = Contact.all
  @contacts.to_json
  erb :index
end

get '/contacts/:id' do
  @contact = Contact.find(params[:id])
  @contact.to_json
end

get '/new' do
  @contact = Contact.find(2)
  @contact.to_json
end

get '/contacts' do 
  @contacts = Contact.all
  @contacts.to_json

end

delete '/contacts/:id' do 
  @contact = Contact.find(params[:id])
  @contact.destroy
end




post '/contacts' do

  @contact = Contact.new(
    firstname: params[:firstname],
    lastname: params[:lastname],
    phone: params[:phone],
    email: params[:email],
    cell: params[:cell]
    )
  @contact.save!
  @contact.to_json
end

get '/edit/:id' do
  @contact = Contact.find(params[:id])
  @contact.to_json
end









