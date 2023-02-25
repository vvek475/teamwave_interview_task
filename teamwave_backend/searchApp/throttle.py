from rest_framework.throttling import AnonRateThrottle

class UserMinThrottle(AnonRateThrottle):
             scope = 'anon_min'
             
class UserDayThrottle(AnonRateThrottle):
             scope = 'anon'