# Starting Redis

Run in foreground.

```bash
redis-server
```

Run and stop in background.

```bash
brew services start redis
brew services stop redis
```

Check Redis status

```bash
brew services info redis
```

# Connecting and Quitting Redis Client

```bash
redis-cli
quit
```

# Time to Live (`ttl`)

```
redis-cli set meow "Hello World"
redis-cli expire meow 10
redis-cli ttl meow # int 10 in seconds
```

- `ttl` command will return `-1` if the key does not exist
- getting a key which no longer exists will return `nil`

# Data Structures
- `flushall` deletes everything

## List

Pushing and popping from the list.

```
lpush fruits banana
rpush fruits apple
lpush fruits cantaloupe
lpop fruits
rpop fruits
```

Getting information from the list.

```
llen fruits        # int 3
lrange fruits 0 -1 # ["apple", "banana", "candy"]
```

## Set

```
sadd peers husky, shiba, retriever
srem retriever
sismember peers husky # bool true
smembers peers        # ["husky", "shiba"]
```

## Hash Map

```
hset collection_name key "value"
hget collection_name key # "value"
hdel collection_name key
hkeys collection_name   # ["key"]
hvals collection_name   # ["value"]
hgetall collection_name # {"key" => "value"}
hlen collection_name    # int 1
hexists collection_name key # bool true
```

## Streams

| command  | description                              |
| -------- | ---------------------------------------- |
| `xadd`   | adds list of key-value pairs to a stream |
| `xlen`   | length of stream                         |
| `xrange` | get a range of values from a stream      |


### Append to Stream `xadd`

```bash
xadd stream_name * k1 v1 k2 v2 k3 v3
```

 - `stream_name` is the arbitrary name of the stream
 - `*` the second argument is for a unique id, but with `*` we leave the
   autogeneration up to Redis.
 - `k1`, `k2`, `k3` are the keys and `v1`, `v2`, `v3` are the values
