class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  # skip_before_filter :verify_authenticity_token ,:only => [:index]
  before_filter :cor
  def cor
    if request.headers["HTTP_ORIGIN"]
      headers['Access-Control-Allow-Origin'] = Rails.application.secrets.website_url
      headers['Access-Control-Expose-Headers'] = 'ETag'
      headers['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS, HEAD'
      headers['Access-Control-Allow-Headers'] = '*,x-requested-with,Content-Type,If-Modified-Since,If-None-Match,Auth-User-Token'
      headers['Access-Control-Max-Age'] = '86400'
      headers['Access-Control-Allow-Credentials'] = 'true'
    end
  end
end
