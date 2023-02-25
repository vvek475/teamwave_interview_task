import requests

from django.core.cache import cache
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import throttle_classes

from .serializers import searchParamsSerializer
from .helpers import searchParamsHandler
from .throttle import UserMinThrottle,UserDayThrottle

# custom throttle for limiting user requests
@throttle_classes([UserDayThrottle,UserMinThrottle])
class search(APIView):
    
    # serializer class to convert convert posted data into params 
    # and remove additional fields sent e.g hidden csrf field
    serializer_class = searchParamsSerializer
    
    def post(self,*args,**kwargs):
        
        request_data = self.request.data
        
        if (request_data.get('order')==None and request_data.get('sort')==None):
            return Response({'message':'Please pass sort and order'},status=400)
        
        if (request_data.get('tagged')=='' and request_data.get('intitle')==''):
            return Response({'message':'Please pass either tagged or intitle'},status=400)
        
        if (request_data.get('page') and (int(request_data.get('page'))<1 or int(request_data.get('page')))>25):
            return Response({'message':"Page value can't negative or above 25"},status=400)

            
        data=self.serializer_class(data=self.request.data)
        
        if data.is_valid(raise_exception=True):
            # this class takes all params and appends them to
            # API end point
            data=searchParamsHandler(data.data)
        
        # checks for cached data using converted url as key
        response=cache.get(data.url)
        
        if response:
            return Response(response.json())
        
        # if no cached data request is then made
        res=requests.get(data.url)
        if res.status_code is 200:
            cache.set(data.url,res)    
            return Response(res.json())
        return Response({'Internal server Error'},status=500)