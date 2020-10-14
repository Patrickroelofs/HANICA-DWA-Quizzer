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

export async function joinRoom(roomCode, teamName) {
  console.log(teamName, roomCode)
  const response = await axios.post(serverFetchBase +`/teams/${teamName}`, {roomCode : roomCode}, {withCredentials: true})
  return response
}


export function startLogout() {
  return  fetch(serverFetchBase+'/logout', { method: 'DELETE', credentials: 'include', mode: 'cors' })
             .then((response) => checkFetchError(response));
}
