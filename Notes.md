# Notes

## Tech used

Next.js
Tailwind
Shad.cn
imagekit - image optimization and storage
Neon - serverless postgreSQL database
Drizzle Headless TypeScript ORM (object relational mapping) - make it simple to specify architecture of complex databases in simple js code
Auth.js
bcrypt - encrypting passwords
Upstash

- Redis - rate limit (prevent DDOS)
- Qstash - send emails to new users and send periodic emails.
-
- cash data, make efficient searches
- Next after - allows you to shedule work to be executed after a response is finished
- react-colorful - for color picking - https://www.npmjs.com/package/react-colorful

## video tutorial help

https://www.youtube.com/watch?v=EZajJGOMWas&t=1506s

- currently at 5hr21 min - Seed db

## later app ideas

- character sheet to see clothes
- swipe a clothing to change it to another one in the db. or tap the clothing to select a popup menu of all clothing of that type

## Drizzle and database notes

https://orm.drizzle.team/docs/tutorials/drizzle-with-neon#applying-changes-to-the-database

- You can generate migrations using 'npx drizzle-kit generate' command and then run them using the 'npx drizzle-kit migrate' command.
- Alternatively, you can push changes directly to the database using Drizzle kit push command: npx drizzle-kit push
- Run drizzle server - npm run db:studio

## ISSUES

- upstash workshow isnt going to the next step. sending into email works, but it wont wait for the next step (waiting 3 days for follow up email) (in video before 3hrs 57min ) - Error [QstashError]: {"error":"unable to authenticate: invalid token"}
- duplicate names files can be uploaded to imagekit.io. may cause issues later on

## Seed dummydata to database

- npm run seed
- set up seed.ts file in db as a standalone file to seed demo data.
