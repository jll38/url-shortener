# Next.JS 13 URL-Shortener

A URL shortening service with an analytics dashboard.
Built using Next.JS 13, backed by Prisma and MongoDB for data management


## Features

### Homepage & URL Shortener
<img width="1511" alt="image" src="https://github.com/jll38/url-shortener/assets/97925400/599efc38-1409-463e-b71f-375d390d6ebb">

### Analytics Dashboard
![image](https://github.com/jll38/url-shortener/assets/97925400/6a6ebad8-ce76-42bc-addd-8f27c7566e79)

Graphs and Charts created utilizing [React-Vis](https://uber.github.io/react-vis/).
#### Top Performers
Displays the top 5 best performing links of all time for the logged in user. It displays the name/alias of each link as well the destination, # clicks, and whether or not the link has risen or fallen in ranking.

#### Click Metrics
Displays a line graph containing the data of the number of clicks in a time range (Daily, Weekly, Monthly, YTD, All Time). Hovering over a section of the graph will display

#### Top Referrers
Displays a bar graph containing data for the top sources/website from where users are clicking the shortened links. Hovering over a section of the graph will display the name of the source and any relevant data.

#### Devices
Displays a pie containing data on the devices and browsers users are clicking links from. Hovering over a section of the pie chart will display the name of the device/browser, number of occurances, and any relevant data.

### Geolocation & Link Traffic Heatmap
![image](https://github.com/jll38/url-shortener/assets/97925400/f31de84d-818e-4d05-bfbd-094a4dbd9c05)

#### Geolocation Collection
Upon a shortened link being clicked, the user's IP address is collected and use to grab the general location of the user. From there, coordinates are organized and displayed onto the [Mapbox](https://www.mapbox.com/) component as a heatmap.

### Custom Link Aliases
From the dashboard, users will be able to create and customize new links, as well as viewing and/or modifying exisitng links. The link's "alias" is what replaces the random string of characters that identifies the Short URL. For example, rather than ```https://tinyclicks.co/d7Qw2eP```, a user could set the alias for their URL to be ```https://tinyclicks.co/CoOlLiNk```.
In the event of duplicate links, they will point to the same original URL/destination, but the link will be modified to avoid issues with collecting analytics for each link and user.

### Password Protection
To Be Developed
### QR Code Generation
To Be Developed
### Bulk Shortening
To Be Developed
### Link Tree Hosting
<img width="1508" alt="image" src="https://github.com/jll38/url-shortener/assets/97925400/6c946b7e-57b7-451e-8ead-8d4bce3b0ee5">
