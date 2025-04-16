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
Upstash - rate limit( prevent DDOS), serverles Redis DB, cash data, make efficient searches

## video tutorial help

https://www.youtube.com/watch?v=EZajJGOMWas&t=1506s

- currently at 3hr6 min - User onboarding flow

## later app ideas

- character sheet to see clothes
- swipe a clothing to change it to another one in the db. or tap the clothing to select a popup menu of all clothing of that type

## Drizzle and database notes

https://orm.drizzle.team/docs/tutorials/drizzle-with-neon#applying-changes-to-the-database

- You can generate migrations using 'npx drizzle-kit generate' command and then run them using the 'npx drizzle-kit migrate' command.
- Alternatively, you can push changes directly to the database using Drizzle kit push command: npx drizzle-kit push
- Run drizzle server - npm run db:studio
