class Contact < ActiveRecord::Base
  validates :firstname, presence: true
  validates :lastname, presence: true
  validates :phone, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
end

