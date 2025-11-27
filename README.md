# Fibre fantasies frontend

This project is a full-stack social media platform centered around one of my hobbies: crochet and knitting. It allows users to search for patterns (provided by the [Ravelry API](https://www.ravelry.com/api)), save them to a list, and share posts showcasing their own work. Users can follow one another, interact with posts, and discover and organise patterns.

### Link

[Backend source code](https://github.com/aycin1/fibre-fantasies-frontend)

<!-- [Deployed website]() -->

## How it's made

The frontend is built with **React** and **Vite**, which provides fast development builds. Navigation is achieved using **React-Router** and the interface is composed of reusable components that communicate with the backend using RESTful API calls for CRUD operations.

This project utilises **ImageKit**, which provides optimised image rendering. Images uploaded by users are returned as ImageKit URLs (from the backend) and are subsequently rendered on the frontend.

Styling is achieved with **CSS modules**, enabling local scopes and therefore greater code maintainability.

Tests are run with **Vitest**, using **React Testing Library** for interacting with and querying DOM elements and **Mock Service Worker** to intercept and mock network requests made to the backend.

# Usage

<!-- // add screenshots of site flow and how website can be used -->

# Installation

<!-- //// -->

## Dependencies

- @fortawesome/fontawesome-svg-core 7.0.1
- @fortawesome/free-regular-svg-icons 7.1.0
- @fortawesome/free-solid-svg-icons 7.0.1
- @fortawesome/react-fontawesome 3.0.2
- @imagekit/react 5.0.1
- axios 1.12.1
- react 19.1.1
- react-checkbox-tree 1.8.0
- react-dom 19.1.1
- react-router 7.9.0
- uuid 13.0.0

# Improvements

<!--ability to share patterns and instant message with friends -->

- I intend to implement pagination within the Search component for faster loading of data on the frontend received from the third party API via the backend.

- Currently, three custom lists are created upon user registration on the backend. I would like to establish the appropriate endpoints for users to be able to create, edit, and delete their own lists.

- I aim to add privacy features such as making your profile private and having the ability to approve or deny follow requests from other users, as well as the option to make any list public and therefore visible on the users profile.

- Furthermore, I hope to collate informative blogs and tutorials for an educational section for those who would like to learn or advance their skills.

# Acknowledgements

- [Ravelry](https://www.ravelry.com/api)

- [Dave Gray](https://github.com/gitdagray)

- [Font Awesome](https://fontawesome.com/)

- [ImageKit](https://imagekit.io/)

<!-- **This project is purely for / purposes** -->
