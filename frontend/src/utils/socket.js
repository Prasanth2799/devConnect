import io from "socket.io-client";
import {BASE_URL} from "../utils/constants"
export const createSocketConnection = () => {
    if(location.hostname === "localhost"){
        return io(BASE_URL)
    }else{
        return io("/", {path : "/api/socket.io"})
    }
};

//export const BASE_URL = location.hostname === "localhost" ? "http://localhost:9999" : "/api";
