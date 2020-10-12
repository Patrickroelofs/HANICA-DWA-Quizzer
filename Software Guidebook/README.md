# Software Guidebook - Quizzer

## Contents
1. [Introduction](#Introduction)
2. [Wireframes](#Wireframes)
3. [REST](#REST)
4. [Database](#Database)

## Introduction
The quizzer is a web application that runs on 3 different devices, the master-tablet app, the teams-phone app and the tv-screen/beamer Scoreboard app.


## REST
| METHOD | URL |
|    --- | --- |
| POST | /rooms/:roomid |
| PATCH | /rooms/:roomid |
| DELETE | /rooms/:roomid |
| POST | /rooms/:roomid/teams |
| POST | /rooms/:roomid/teams |
| DELETE | /rooms/:roomid/teams/:teamid |
| PATCH | /rooms/:roomid/teams/:teamid |
| PATCH | /rooms/:roomid/teams/:teamid/question |
| POST | /rooms/:roomid/rounds/:roundid |
| PUT | /rooms/:roomid/rounds/:roundid |
| POST | /rooms/:roomid/rounds/:roundid/questions |
| GET | /categories |
| GET | /:category/questions |

## Database
### Questions
| name | type | default | required |
| --- | --- | --- | --- |
| id | String | X | O |
| question | String | X | X | 
| answer | String | X | X |
| category | String | X | X |
| language | String | X | X |

### Rooms
| name | type | default | required |
| --- | --- | --- | --- |
| id | String | X | O |
| language | String | X | O |
| teams | [Team] | X | X |
| started | Boolean | false | O |
| round | Number | 0 | O |
| categories | [String] | X | X |
| questionNumber | Number | 0 | X |
| questions | [String] | X | X |
| questionsAsked | [String] | X | X |
| currentQuestion | Question | X | X |


### Teams
| name | type | default | required |
| --- | --- | --- | --- |
| id | String | X | O |
| name | String | X | O |
| roundPoints | Number | 0 | X |
| roundScore  | Number | 0 | X |
| answer | String | X | X |

## Websocket
### Master app -> Server
| action | type |
| --- | --- |
| master wordt verbonden | `{messageType: "MASTER_CONNECT"}` |
| team accepteren | `{messageType: "MASTER_ACCEPT", team: {teamName: String}}` |
| team verwijderen | `{messageType: "MASTER_DENY", team: {teamName: String}}` |
| ronde starten | `{messageType: "MASTER_STARTROUND"}` |
| vraag versturen | `{messageType: "MASTER_QUESTION", question: {_id: String, category: String}}` |
| antwoorden stoppen | `{messageType: "MASTER_STOPANSWERS"}` |
| antwoorden reviewen | `{messageType: "MASTER_REVIEWANSWERS", question: String, answers: [{teamName: String, answer: String, isCorrect: Boolean}]}`
| ronde eindigen | `{messageType: "MASTER_ENDROUND"}` |
| spel stoppen | `{messageType: "END_GAME"}` |

### Team app -> Server
| action | type |
| --- | --- |
| team wordt geregistreerd | `{messageType: "TEAM_CONNECT", teamName: String}`
| team verstuurd antwoord | `{messageType: "TEAM_ANSWER", teamName: String, answer: String`}

### Scoreboard -> Server
| action | type |
| --- | --- |
| scoreboard verbinden | `{messageType: "SCOREBOARD_CONNECT"}` |

### Server -> Team app
| action | type |
| --- | --- |
| toegestaan om game te spelen | `{messageType: "TEAM_ALLOWED", isAllowed: Boolean}`|
| nieuwe vraag | `{messageType: "TEAM_NEWQUESTION", question: String, category: String}` |
| Antwoorden reviewed | `{messageType: "TEAM_ANSWERREVIEWED", correct: Boolean}` | 
| einde game | `{messageType: "END_GAME" }` |

### Server -> Master app
| action | type |
| --- | --- |
| Team binnengekomen | `{messageType: "TEAM_JOINED", teamName: String}` |
| antwoord binnengekomen | `{messageType: "NEW_ANSWER", teamName: String: answer: String}` |
| 

### Server -> Scoreboard
| action | type |
| --- | --- |
| score | `{messageType: "SCORES", teams: [{teamName: String, roundPoints: Number}]}`|
| resultaat vraag | `{messageType: "QUESTION_RESULTS", question: {question: String, category: String}, teams: [{teamName: String, answer: String, answered: Boolean}]}`
| vraag beantwoord | `{messageType: "ANSWER_SUBMITTED", teamName: String }`

## State
### Master app
```json
{
    roomCode: '',
    language: '',
    round: 0,
    appliedTeams: [],
    approvedTeams: [],
    question: 0,
    questions: [],
    currentQuestion: '',
    questionClosed: false,
}
```
### Team app
```json
{
    roomCode: '',
    teamName: '',
    round: 0,
    question: {
        number: 0,
        question: '',
        category: ''
    },
    answer: {
        value: ''
    }
}
```

### Scoreboard App
```json
{
    connected: false,
    roomCode: '',

    question: '',
    category: '',
    teams: [],
    round: 0,
    questionNumber: 0,

}
```

## Wireframes
### Master - startscreen
[wireframe-masterstart]: https://raw.githubusercontent.com/HANICA-DWA/sep2020-quizz-patrick-sanne/main/Software%20Guidebook/wireframes/wireframes-Master%20(start).png?token=AB2NNDMT7L54F2QW66YOEXK7RVJIS "wireframe1-start"
![][wireframe-masterstart]

### Master - accept teams
[wireframe-masterapplication]: https://raw.githubusercontent.com/HANICA-DWA/sep2020-quizz-patrick-sanne/main/Software%20Guidebook/wireframes/wireframes-Master%20(applications).png?token=AB2NNDPDSPDHOHXB2H6CWU27RVJVU "wireframe-masterapplication"
![][wireframe-masterapplication]

### Team - Room code insert
[wireframe-teamcode]: https://raw.githubusercontent.com/HANICA-DWA/sep2020-quizz-patrick-sanne/main/Software%20Guidebook/wireframes/wireframes-Team%20(roomcode).png?token=AB2NNDN2QUV63HF3WLK76BS7RV2JI "wireframe-teamcode"
![][wireframe-teamcode]

### Master - Choose categories
[wireframe-mastercategory]: https://raw.githubusercontent.com/HANICA-DWA/sep2020-quizz-patrick-sanne/main/Software%20Guidebook/wireframes/wireframes-Master%20(category%20select).png?token=AB2NNDP2XQ6HR6DMABJ2EEC7RVJ4U "wireframe-mastercategory"
![][wireframe-mastercategory]

### Master - choose questions
[wireframe-masterquestion]:https://raw.githubusercontent.com/HANICA-DWA/sep2020-quizz-patrick-sanne/main/Software%20Guidebook/wireframes/wireframes-Master%20(question%20select).png?token=AB2NNDITVXEYNV6SVMGAKJK7RVKAK  "wireframe-masterquestion"
![][wireframe-masterquestion]

### Master - send question to teams
[wireframe-masterchoosequestion]: https://raw.githubusercontent.com/HANICA-DWA/sep2020-quizz-patrick-sanne/main/Software%20Guidebook/wireframes/wireframes-Master%20(choose%20question).png?token=AB2NNDKNHJDVQGUWSLLKCA27RVJ56 "masterchoosequestion"
![][wireframe-masterchoosequestion]

### Team - Answer question
[wireframe-teamquestion]: https://raw.githubusercontent.com/HANICA-DWA/sep2020-quizz-patrick-sanne/main/Software%20Guidebook/wireframes/wireframes-Team%20(question).png?token=AB2NNDMWPQLVG4GWNJEFVV27RVKBA "teamquestion"

![][wireframe-teamquestion]

### Scoreboard - Questions answered
[wireframe-scoreboardquestion]: https://raw.githubusercontent.com/HANICA-DWA/sep2020-quizz-patrick-sanne/main/Software%20Guidebook/wireframes/wireframes-Scoreboard%20(questions).png?token=AB2NNDMMBQMWNXQGWDZK3BK7RVKCE "scoreboardquestion"
![][wireframe-scoreboardquestion]

### Master - Review questions
[wireframe-masterreview]: https://raw.githubusercontent.com/HANICA-DWA/sep2020-quizz-patrick-sanne/main/Software%20Guidebook/wireframes/wireframes-Master%20(review%20answers).png?token=AB2NNDPDPJHJFIAEKIATVQC7RVKRU "masterreview"
![][wireframe-masterreview]

### Scoreboard - Answers accepted/denied
[wireframe-scoreboardanswers]: https://raw.githubusercontent.com/HANICA-DWA/sep2020-quizz-patrick-sanne/main/Software%20Guidebook/wireframes/wireframes-Scoreboard%20(answers).png?token=AB2NNDIJVV7EQ6U6DP5OW2C7RVKDS "scoreboardanswers"
![][wireframe-scoreboardanswers]

### Scoreboard - Round scores
[wireframe-scoreboardscores]: https://raw.githubusercontent.com/HANICA-DWA/sep2020-quizz-patrick-sanne/main/Software%20Guidebook/wireframes/wireframes-Scoreboard%20(scores).png?token=AB2NNDKAMWDUPTFTJ3J64KC7RVKEW "scoreboardscores"
![][wireframe-scoreboardscores]

### Master - New round
[wireframe-masternewround]: https://raw.githubusercontent.com/HANICA-DWA/sep2020-quizz-patrick-sanne/main/Software%20Guidebook/wireframes/wireframes-Master%20(new%20round).png?token=AB2NNDIDYCWB3XMKBAIGUGS7RVKF2 "masternewround"
![][wireframe-masternewround]