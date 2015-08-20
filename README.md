# myAdminPortal

I will remove the ghost code soon.

This project is for displaying leave record purpose

---------------------------------
# Sending queue to sent queue

file related
--sts.js
--getRequests.js
DB format for sendingQueue(changable):
stackExample.txt

adding a documentation file
...
# command to run getRaw.js: node getRaw.js

this will do the polling, when there is a new data of the listening cards, it will generate a new record in the database, the name of the database is TrelloMsg_year_month_date

# command to run sts.js: node sts.js

this will get the message waiting in the sending stack and post in the trello.
after that it will be archived in a sent stack. so it is call stack to stack.
