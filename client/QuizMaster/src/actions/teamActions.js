import {sendMessage} from "./sessionActions";

export const TEAM_ACCEPTED = 'TEAM_ACCEPTED'
export const TEAM_REFUSED = 'TEAM_REFUSED'
export const ACCEPT_TEAM = 'ACCEPT_TEAM'
export const REMOVE_TEAM = 'REMOVE_TEAM'
export const GET_TEAMS = 'GET_TEAMS'

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
                dispatch({type: GET_TEAMS, payload: data})
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
                    dispatch({type: ACCEPT_TEAM, payload: data[0].teams})
                    dispatch(sendMessage({type: TEAM_ACCEPTED, team: name}))
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
                    dispatch({type: REMOVE_TEAM, payload: data})
                    dispatch(sendMessage({type: TEAM_REFUSED, team: name}))
                })
        }
    }
}
