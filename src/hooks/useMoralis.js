const APP_ID = "m51lB6A8uygjdUKKwQqAt20MQrO7HHJrWxgC2RhQ";
const SERVER_Url = "https://1xzpdwatopkj.usemoralis.com:2053/server";


export function useMoralis() {
    // Moralis Initialization
    let Moralis;
    if (typeof window !== `undefined`) {
        Moralis = require("moralis");
        Moralis.initialize( APP_ID );
        Moralis.serverUrl = {SERVER_Url};
    }
    return { Moralis };
}
