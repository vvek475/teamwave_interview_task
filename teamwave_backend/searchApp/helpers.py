import datetime


class searchParamsHandler:
    def __init__(self,data):
        self.data=dict(data)
        self.format_data()
        
    def format_data(self):
        self.url=['https://api.stackexchange.com/2.3/search?']
        
        for index,val in enumerate(self.data.items()):
            key,value=val
            
            if key  in ('fromdate','todate','min','max'):
                value=list(map(lambda val:int(val),value.split('-')))
                date=datetime.datetime(*value)
                self.url.append(f'&{key}={round(date.timestamp())}')
                
            else:
                self.url.append(f'&{key}={value}') 
            
            if index==0:
                self.url[-1]=self.url[-1][1:]

        self.url=''.join(self.url+['&site=stackoverflow'])
        
