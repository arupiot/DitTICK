// Backticks help with weird semi-colon errors!

function mapToDittoProtocolMsg(headers, textPayload, bytePayload, contentType) {
    const jsonString = String.fromCharCode.apply(null, new Uint8Array(bytePayload));
    const jsonData = JSON.parse(jsonString);
    const thingId = `arup.eight.fitzroy:UDMIduino-000`;
    const value = {
        udmi: jsonData
    };
    return Ditto.buildDittoProtocolMsg(
        'my.test',
        thingId,
        'things',
        'twin',
        'commands',
        'modify',
        `/features`,
        headers,
        value
    );
}


// String
// function mapToDittoProtocolMsg(headers, textPayload, bytePayload, contentType) { const jsonString = String.fromCharCode.apply(null, new Uint8Array(bytePayload)); const jsonData = JSON.parse(jsonString); const thingId = 'arup.eight.fitzroy:UDMIduino-000'; const value = { udmi: jsonData }; return Ditto.buildDittoProtocolMsg( 'my.test', thingId, 'things', 'twin', 'commands', 'modify', '/features', headers, value ); }