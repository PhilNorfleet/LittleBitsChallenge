class InventionsController < ApplicationController
  protect_from_forgery with: :null_session
  respond_to :json, :html, :js
  def index
    @inventions = Invention.last(10)
  end

  def edit
    @invention = Invention.find(params[:id])
    @form = {
      :action => invention_path,
      :all_bits => Bit.all,
      :type => "PUT",
      :csrf_param => request_forgery_protection_token,
      :csrf_token => form_authenticity_token
      }
  end

  def update
    @invention = Invention.find(params[:id])
    @invention.update(invention_params)
  end

  def show
    @invention = Invention.find(params[:id])
    @bits = @invention.bits
  end

  def new
    @invention = Invention.new
    @form = {
        :action => inventions_path,
        :all_bits => Bit.all,
        :type => "POST",
        :csrf_param => request_forgery_protection_token,
        :csrf_token => form_authenticity_token
      }
  end

  def create
    params[:bits] ||= []
    bit_names = []
    params[:bits].each do |k, v|
      bit_names << v[:name]
    end
    @bits = Bit.where(name: bit_names)
    @invention = Invention.new(invention_params)
    @invention.bits << @bits
    @invention.save
    respond_with(@invention)
    #this does not actually redirect, because we are making an ajax call
    #handle it in ajax success method
  end

  private

  def invention_params
    # print params
    params.require(:invention).permit(:title, :description_text)
  end
end
