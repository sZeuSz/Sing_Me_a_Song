<h1 align='center'>🎶🎵 Sing me a Song API 🎵🎶</h1>

<p align='center'>Recommend your favorite songs and rated recommendations from other users.</p>

## Installation
# clone or download zip: 
    git clone https://github.com/sZeuSz/Sing_Me_a_Song-back.git

## In project directory, in command terminal

`npm i`

## Start 
`npm run start:dev`

## Requests
+ POST /recommendations
    - body: 
    ```js
       {
          "name": "Song title",
          "youtubeLink": "Link song",
       }
    ```
    - response: status code 200

+ POST /recommendations/:id/upvote
    - parameter: id (recommendation id)
    - response: status code 200
    
+ POST /recommendations/:id/downvote
    - parameter: id (recommendation id)
    - response: status code 200
    
+ GET /recommendations/random
    - response:
: 
    ```js
        {
          "id": 666,
          "name": "Song title",
          "youtubeLink": "Link song",
          "score":  666
        },
    ```
+ GET /recommendations/top/:amount
    - parameter: amount (recommendation limit query)
    - response:
: 
    ```js
        [
          {
            "id": 666,
            "name": "Song title",
            "youtubeLink": "Link song",
            "score":  666
          },
          {
            "id": 25,
            "name": "Song title example",
            "youtubeLink": "Link song example",
            "score":  666
          },
          .
          .
          .
        ]
    ```
## Run Tests (unit)
- `npm run test:w`

 
