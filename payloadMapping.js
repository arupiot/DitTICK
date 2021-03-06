function mapToDittoProtocolMsg(headers, textPayload, bytePayload, contentType) {
    const thingId = 'UDMIduino-000';
    const jsonString = String.fromCharCode.apply(null, new Uint8Array(bytePayload));
    const jsonData = JSON.parse(jsonString);
    const value = {
        udmi: {
            properties: {
                version: 1,
                timestamp: 0,
                points: {
                    lux_level: {
                        present_value: jsonData.points.lux_level.present_value
                    },
                    lum_value: {
                        present_value: jsonData.points.lum_value.present_value
                    },
                    dimmer_value: {
                        present_value: jsonData.points.dimmer_value.present_value
                    }
                }
            }
        }
    };

    return Ditto.buildDittoProtocolMsg(
        'open.iot',
        thingId,
        'things',
        'twin',
        'commands',
        'modify',
        '/features',
        headers,
        value
    );
}