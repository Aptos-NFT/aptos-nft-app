import requests
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

project_id = "28psmibihFDr0t5GMm9y9jVTNIr"
project_secret = "ac6a272318ee4d319b9f679038d5b3d7"
endpoint = "https://ipfs.infura.io:5001"

def index(request):
    return render(request, "index.html")

def upload_image(request):
    url = ""
    if request.method == 'POST' and request.FILES['upload']:
        upload = request.FILES['upload']
        files = {
            'file': upload
        }
        response1 = requests.post(endpoint + '/api/v0/add', files=files, auth=(project_id, project_secret))
        url = 'https://aptos.infura-ipfs.io/ipfs/' + response1.text.split(",")[1].split(":")[1].replace('"','')
    return JsonResponse({'url': url})

def view_license(request):
    return render(request, "contract.html")

@csrf_exempt
def mint(request):
    received_json_data=json.loads(request.body)
    return JsonResponse(received_json_data)
