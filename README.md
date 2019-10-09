# The Vancouver bad landlord API

This api allows you to query the bad landlord of Vancouver.  The following routes are available.

```
/areas
/areas/{area name}
/operators
/operators/{name of operator}
/streets
/streets/{street name}
```

# How it works

All endpoints work in a similar way, for example the following all the streets that contains rental suites:

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