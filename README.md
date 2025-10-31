# YUltimate Management System

## Table of contents

- [Figma Design](#figma-design)
- [API Routes](#api-routes)

## Figma Design

https://www.figma.com/design/BO5DEAwK7QqnFMA6mryEjo/Untitled?node-id=9-63&t=tewx01FlUafv8hQl-1

## API Routes

`/signup` -> For signup of online/general students and coaches
`/signup/:uid` -> Onsite student only signup, can be created by a coach and the approval requests from this link will directly go to the owner coach
`/login` -> For login of already created accounts
`/profile/:id` -> For viewing your own or other's profiles
`/events` -> To display a list of all the ongoing tournaments and other events, can be organized by coaches and will be filtered for students using their location
`/events/:eventId` -> To view the details of a specific event
`/events/:eventId/leaderboard` -> To view the leaderboard for an ongoing tournament
`/events/:eventId/score/` -> For the judges to score & penalize teams/participants during events

## Getting Started

```bash
$ git clone https://github.com/yashchaurasia667/yUltimate-management-system.git
$ npm install
$ npm run dev
```

view the website running at http://localhost:3000/
