function publishJSON(key, value) {
    var publishArray = ["PUBLISH", key, JSON.stringify(value)];
    local.send(JSON.stringify(publishArray));
}

function subscribe(key){
    var subscribeArray = ["SUBSCRIBE", key];
    local.send(JSON.stringify(subscribeArray));
}

function unsubscribe(key){
    var unsubscribeArray = ["UNSUBSCRIBE", key];
    local.send(JSON.stringify(unsubscribeArray));
}

function wsMessageReceived(message){
    var messageData = JSON.parse(message);
    if(messageData.SUBSCRIBE){
        var subscribeArray = messageData.SUBSCRIBE;
        var key = subscribeArray[1];
        var value = JSON.parse(subscribeArray[2]);

        if(typeof value === 'number'){
            // handle numeric value
            local.values.addFloatParameter(key, "", value);
            local.values.getChild(key).set(value);
        } else {
            // handle non-numeric value
            local.values.addStringParameter(key, "", value);
            local.values.getChild(key).set(value);
        }
    }
}