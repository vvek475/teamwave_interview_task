from rest_framework import serializers

class searchParamsSerializer(serializers.Serializer):
    
    order_choice=(
        ('desc', 'descending'),
        ('asc', 'ascending')
    )
    
    sort_choice = (
        ('activity', 'activity'),
        ('votes', 'votes'),
        ('creation', 'creation'),
        ('relevance', 'relevance')
    )
    
    page = serializers.IntegerField(required=False)
    pagesize = serializers.IntegerField(required=False)
    fromdate = serializers.DateField(required=False)
    todate = serializers.DateField(required=False)
    order = serializers.ChoiceField(choices=order_choice)
    min = serializers.DateField(required=False)
    max = serializers.DateField(required=False)
    sort = serializers.ChoiceField(choices=sort_choice)
    tagged = serializers.CharField(required=False)
    nottagged = serializers.CharField(required=False)
    intitle = serializers.CharField(required=False)