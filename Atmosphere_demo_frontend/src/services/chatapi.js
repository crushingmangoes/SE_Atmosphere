import Axios from "axios";
import SockJS from "sockjs-client";

const api = Axios.create({
    baseURL: '/api/',
});

const chatAPI = {
    getMessages: (groupId) => {
        console.log('Calling get messages from API');
        return api.get(`messages/${groupId}`);
    },

    getUsers: () => 
    {
        return api.get(`users`)

    },

    updateStatus: (username, text) => 
    {
        let msg = 
        {
            sender: username, 
            content: text
        }
        return api.post(`send`, msg);
    },

    sendMessage: (username, text) => {
        let msg = {
            sender: username,
            content: text
        }
        return api.post(`send`, msg);
    },

    sendStatus: (username, user_status) => {
        let msg = {
            sender: username,
            status: user_status
        }
        return api.post(`send`, msg);
    }
}


export default chatAPI;
