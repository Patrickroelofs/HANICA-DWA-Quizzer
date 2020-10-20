import {sendMessage} from "./sessionActions";

export const ACCEPT_TEAM = 'ACCEPT_TEAM'
export const REMOVE_TEAM = 'REMOVE_TEAM'
export const GET_TEAMS = 'GET_TEAMS'

function ActionRemoveTeam(payload) {
    return {
        type: REMOVE_TEAM,
        payload: payload,
    }
}

function ActionAcceptTeam(payload) {
    return {
        type: ACCEPT_TEAM,
        payload: payload,
    }
}

function ActionGetTeams(payload) {
    return {
        type: GET_TEAMS,
        payload: payload,
    }
}

export function getTeams(roomCode) {
    return (dispatch) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            mode: 'cors',
        }

        fetch(`http://localhost:3001/teams/${roomCode}`, options)
            .then((response) => response.json())
            .then((data) => {
                dispatch(ActionGetTeams(data))
            })
    }
}

export function reviewTeam(name, which) {
    return (dispatch) => {
        if (which === 'accept') {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                mode: 'cors',
            }

            fetch(`http://localhost:3001/teams/name/${name}`, options)
                .then((response) => response.json())
                .then((data) => {
                    dispatch(ActionAcceptTeam(data[0].teams))
                    dispatch(sendMessage(JSON.stringify({type: 'TEAM_ACCEPTED', team: name})))
                })

        } else if (which === 'remove') {
            const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                mode: 'cors',
            }

            fetch(`http://localhost:3001/teams/${name}`, options)
                .then((response) => response.json())
                .then((data) => {
                    dispatch(ActionRemoveTeam(data))
                    dispatch(sendMessage(JSON.stringify({type: 'TEAM_REFUSED', team: name})))
                })
        }
    }
}
