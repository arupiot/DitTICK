## Main source that this whole thing extends

https://github.com/eclipse/ditto-examples/tree/master/mqtt-bidirectional

(Depends on the docker deployment)

## Getting started

- Start ditto via `docker-compose up -d`
- Create a policy
- Create a connection
- Create a thing


- Test with `mosquitto_pub` first, don't get crazy!

```
mosquitto_pub -h localhost -p 1883 -t arup-8-fitzroy-street/UDMIduino-000/event
s -m 'test'
```

With a sample payload like:

```
{"present_value":62}
```

e.g.

```
mosquitto_pub -h localhost -p 1883 -t arup-8-fitzroy-street/UDMIduino-000/events -m '{"present_value":62}' -d
```


- Create a payload mapping
     - And then debug for a while
     - read this forever: https://www.eclipse.org/ditto/connectivity-mapping.html

- remove newlines in the JS with `tr '\n' ' ' < payloadMapping.js > payloadMapping.txt`

## Gotchas

Auth for devops commands: `devops:foobar`
- https://github.com/eclipse/ditto/issues/202

## Links

https://www.eclipse.org/ditto/2018-05-02-connecting-ditto-hono.html
https://github.com/eclipse/ditto/issues/202
https://stackoverflow.com/questions/56777282/connecting-eclipse-hono-and-ditto
