# Montu Giphy Viewer

This repository is built for Montu's React code challenge. The goal of the challenge is to build a React application for viewing and searching GIFs using the Giphy API.

## Setup

**Requirements**:

- When a user first loads the app, they should see the first page of trending GIFs from [Giphy's Trending Endpoint](https://developers.giphy.com/docs/api/endpoint#trending)
- A user should be able to search for GIFs that should be pulled from [Giphy's Search Endpoint](https://developers.giphy.com/docs/api/endpoint#search)

**Expectations**:

- We would prefer the use functional components and hooks rather than class components
- We would prefer the avoidance of third-party state management libraries (Redux, Zustand, etc)
- Your pages and layouts should consider either desktop OR mobile - no need to build for both, given the time frames

**Optional improvements**:

The test should take approximately 2 hours to complete, and we recommend allocating this time without interruptions or distractions to ensure a fair evaluation of your abilities.

If you are able to complete the base requirements with some time to spare, you might consider adding one or more of these improvements to show off more of your skills:

- Add pagination to the trending and/or search page to allow users to see more GIFs. This could be implemented as an infinite scroll, numbered pages or a "show more" button
- Show placeholders or skeletons for the page while GIFs are being fetched and loaded
- A user should be able to save and unsave GIFs, they should be able to see their saved GIFs which should persist after closing or refreshing the page
- Add an animation to the "save" or "like" button to make it more fun to save a GIF

### Getting started

1. We suggest using a template set up like [Vite](https://vitejs.dev/guide/)
2. Follow [Giphy's Quickstart](https://developers.giphy.com/docs/api#quick-start-guide) to create a Giphy App in their Developer Dashboard which will provide you with an API key to use for making requests
3. Checkout [Giphy's API Explorer](https://developers.giphy.com/explorer) as a helper for making API requests and viewing responses

### Submission

Please submit your completed project as a single zip file.

Outline any interesting choices you made, approaches you are proud of and any parts that we might miss. This helps us when reviewing your submission to see the details of everything you worked on.

We also welcome all feedback on what you thought of the project, any roadblocks or hurdles you faced, whether the time expectation is reasonable, etc.
