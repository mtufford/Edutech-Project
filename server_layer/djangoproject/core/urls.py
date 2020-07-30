from django.conf.urls import url
from . import views
urlpatterns = [
	url(r'^$', views.index),
	url(r'request/search/', views.searchSites),
	url(r'request/voteOnLink/', views.voteOnLink),
	]
