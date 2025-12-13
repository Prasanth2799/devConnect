import io from "socket.io-client";
import {BASE_URL} from "../utils/constants"
export const createSocketConnection = () => {
    return io(BASE_URL)
}

//export const BASE_URL = location.hostname === "localhost" ? "http://localhost:9999" : "/api";
