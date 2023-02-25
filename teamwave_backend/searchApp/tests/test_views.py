from django.test import TestCase, Client
from django.urls import reverse

class TestSearchView(TestCase):
    def setUp(self) -> None:
        self.client = Client()
        self.url=reverse('search')
        
    def test_empty_post_data(self):
        response = self.client.post(self.url,{
            
        })
        result=response.json()
        self.assertEquals(result['message'],'Please pass sort and order')
        self.assertEquals(response.status_code,400)
        
    def test_no_intitle_no_tagged(self):
        response = self.client.post(self.url,{
            'sort':'activity',
            'order':'desc'
        })
        result=response.json()
        self.assertEquals(result['message'],'Please pass either tagged or intitle')
        self.assertEquals(response.status_code,400)
    
    def test_good_request(self): 
        response = self.client.post(self.url,{
            'sort':'activity',
            'order':'desc',
            'tagged':'python'
        })
        self.assertEquals(response.status_code,200)
        
    def test_page_negative(self):
        response = self.client.post(self.url,{
            'sort':'activity',
            'order':'desc',
            'tagged':'python',
            'page':'-1'
        })    
        
        result=response.json()
        self.assertEquals(result['message'],'Page value is negative')
        self.assertEquals(response.status_code,400)

    def test_empty_response(self):
        response = self.client.post(self.url,{
            'sort':'activity',
            'order':'desc',
            'tagged':'Narendra_Modi',
        })
        result=response.json()
        self.assertEquals(result['items'],[])
        self.assertEquals(response.status_code,200)
        
    def test_page_negative(self):
        response = self.client.post(self.url,{
            'sort':'activity',
            'order':'desc',
            
            'intitle':'python',
            'page':'26'
        })    
        
        result=response.json()
        self.assertEquals(result['message'],"Page value can't negative or above 25")
        self.assertEquals(response.status_code,400)
