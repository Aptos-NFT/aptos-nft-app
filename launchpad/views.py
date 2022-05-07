import requests
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import datetime
import base64

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
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    d = datetime.datetime.now()
    view = request.GET["view"]
    date = d.strftime("%a") + " " + d.strftime('%B') + " " + d.strftime('%d') + ", " + d.strftime('%Y')
    data = json.loads(base64.b64decode(view))
    data.update({"date": date, "ip": ip})

    return render(request, "contract.html", data)

@csrf_exempt
def mint(request):
    received_json_data=json.loads(request.body)
    return JsonResponse(received_json_data)