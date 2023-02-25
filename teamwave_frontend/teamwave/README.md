# Stack Overflow Search Engine

Please build an Application over StackOverflowAPI for searching questions in StackOverflow (ref: https://api.stackexchange.com/docs/advanced-search)

Requirement:
1) Should be able to search all available fields/parameters. 
2) List the result with pagination with Django template (Using Restful API and angular/react bonus).
3) Page/Data should be cached. (Application should only call StackOverflowAPI if we didn't pull data already for same query param)
4) Add Search limit per min(5) and per day(100) for each session.
