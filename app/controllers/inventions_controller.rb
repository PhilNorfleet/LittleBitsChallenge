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
      :all_other_materials => OtherMaterial.all,
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
    @other_materials = @invention.other_materials
  end

  def new
    @invention = Invention.new
    @form = {
        :action => inventions_path,
        :all_bits => Bit.all,
        :all_other_materials => OtherMaterial.all,
        :type => "POST",
        :csrf_param => request_forgery_protection_token,
        :csrf_token => form_authenticity_token
      }
  end

  def create
    params[:bits] ||= []
    params[:other_materials] ||= []
    bit_names = []
    params[:bits].each do |k, v|
      bit_names << v[:value]
    end
    @bits = Bit.where(name: bit_names)
    other_materials = []
    params[:other_materials].each do |k, v|
      mat = OtherMaterial.where(name: v[:value]).find_or_create_by(name: v[:value])
      other_materials << mat
    end
    @other_materials = other_materials
    @invention = Invention.new(invention_params)
    @invention.bits << @bits
    @invention.other_materials << @other_materials
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
