# The Vancouver bad landlord API

This api allows you to query the bad landlords of Vancouver.  The following routes are available.

```
/areas
/areas/{area name}
/operators
/operators/{name of operator}
/streets
/streets/{street name}

/issues/{number of issues to show}
```

# How it works

With the expection of the /issues, all endpoints work in a similar way, for example the following all the streets that contains rental suites:

```
% curl https://learn.operatoroverload.com/rental/streets
[
   {
      "street" : "ABBOTT STREET"
   },
   {
      "street" : "ALBERNI STREET"
   },
   {
      "street" : "ALEXANDER STREET"
   },
...
```

To get the actual list of properties, provide the url-encoded street name in the URL:

```
% curl https://learn.operatoroverload.com/rental/streets/ABBOTT%20STREET
[
   {
      "street_number" : "320",
      "total_units" : 60,
      "total_outstanding" : 3,
      "area" : "Downtown",
      "id" : 1,
      "businessURL" : "http://app.vancouver.ca/RPS_Net/Default.aspx?num=320&street=ABBOTT%20STREET",
      "street" : "ABBOTT STREET",
      "operator" : "0707892 BC Ltd",
      "geom" : "\"{\"\"type\"\": \"\"Point\"\", \"\"coordinates\"\": [-123.10664756, 49.28261413]}\""
   },
   {
      "area" : "Downtown",
      "businessURL" : "http://app.vancouver.ca/RPS_Net/Default.aspx?num=404&street=ABBOTT%20STREET",
      "id" : 29,
      "geom" : "\"{\"\"type\"\": \"\"Point\"\", \"\"coordinates\"\": [-123.10713559, 49.2816849]}\"",
      "street" : "ABBOTT STREET",
      "operator" : "Central City Foundation",
      "total_units" : 71,
      "street_number" : "404",
      "total_outstanding" : 1
   }
]

```

## /issues/{num}

The /issues/{num} endpoint returns a num of properties that has the most unresolved issues with the city.
For example, calling /issues/10 will return the top 10 rental properties with the most issues.

Example:

```
% curl https://learn.operatoroverload.com/rental/issues/2
[
   {
      "businessURL" : "http://app.vancouver.ca/RPS_Net/Default.aspx?num=1119&street=HORNBY%20STREET",
      "id" : 215,
      "operator" : "Atira Women's Resource Society",
      "area" : "",
      "total_units" : 87,
      "street_number" : "1119",
      "street" : "HORNBY STREET",
      "total_outstanding" : 130,
      "geom" : ""
   },
   {
      "geom" : "\"{\"\"type\"\": \"\"Point\"\", \"\"coordinates\"\": [-123.10703834, 49.28369274]}\"",
      "street_number" : "122",
      "area" : "Downtown",
      "total_units" : 140,
      "operator" : "Atira Women's Resource Society",
      "total_outstanding" : 117,
      "street" : "WATER STREET",
      "businessURL" : "http://app.vancouver.ca/RPS_Net/Default.aspx?num=122&street=WATER%20STREET",
      "id" : 418
   }
]
```
