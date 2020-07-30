from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
import json
import requests
from django.http import HttpResponse
from .htmlparsers import *
import core.models as cor
import random

# Create your views here.
@ensure_csrf_cookie
def index(request):
	return render(request, 'app_index.html')


def searchSites (request):
	data = json.loads(request.body.decode('utf-8'))
	textquery = data['q']
	google_results = googleResults(textquery)
	webopedia_results = webopediaResults(textquery)
	stackoverflow_results = stackoverflowResults(textquery)

	all_results =  webopedia_results + stackoverflow_results + google_results


	for linkitem in all_results:
		rankedlink, created = cor.RankedLink.objects.get_or_create(link=linkitem['link'])
		linkitem['up'] = int(rankedlink.up)
		linkitem['down'] = int(rankedlink.down)

	random.shuffle(all_results)
	ranked_results = sorted(all_results, reverse=True, key=lambda k: (int(k['up']) - int(k['down'])))
	return HttpResponse(json.dumps(ranked_results))

def voteOnLink (request):
	data = json.loads(request.body.decode('utf-8'))
	selectedLink = data['link']
	uservote = data['vote']

	rankedlink, created = cor.RankedLink.objects.get_or_create(link=selectedLink)

	if uservote == "Yes":
		rankedlink.up += 1

	if uservote == "No":
		rankedlink.down += 1

	rankedlink.save()


	return HttpResponse(json.dumps({"vote" : uservote}))
