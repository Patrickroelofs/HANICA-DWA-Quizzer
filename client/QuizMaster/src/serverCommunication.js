import axios from 'axios'

const port = 3001;
const serverHostname = `${window.location.hostname}:${port}`
const serverFetchBase = `${window.location.protocol}//${serverHostname}`

let theSocket;

export function openWebSocket() {
  if(theSocket) {
    theSocket.onerror = null;
    theSocket.onopen  = null;
    theSocket.onclose = null;
    theSocket.close();
  }
  console.log("Opening socket for", `ws://${serverHostname}`);
  theSocket = new WebSocket(`ws://${serverHostname}`);
  console.log(theSocket)
  return theSocket;
}

export function getWebSocket() {
  if( theSocket ) {
    return theSocket;
  }
  else {
    throw new Error("The websocket has not been opened yet.")
  }
}

function checkFetchError( response ) {
    console.log(response)
  return response.statusText === "OK"
            ? response
            : Promise.reject(new Error('Unexpected response'));
}

export async function startCreationRoom() {
  const response = await axios.post(serverFetchBase+'/quiz', {language: "NL"}, { withCredentials: true})
  return response
}

export async function getQuest() {
    fetch( serverFetchBase+'/questions', {method : 'GET', mode: 'cors', credentials: "include"}).then(response =>  console.log(response))

}
export async function getCategories() {
    return await axios.get(serverFetchBase+`/category`)

}

export async function addTeam(roomCode) {
  await axios.post(serverFetchBase +'/teams/pizza', {roomCode : 555}, {withCredentials: true})
}

export async function removeTeam(team, roomCode) {
  const response = await axios.delete(serverFetchBase +`/quiz/${roomCode}/teams/${team}`, {withCredentials: true})
  return response
}




export function startLogout() {
  return  fetch(serverFetchBase+'/logout', { method: 'DELETE', credentials: 'include', mode: 'cors' })
             .then((response) => checkFetchError(response));
}
