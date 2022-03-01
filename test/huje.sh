# try_cmd() {
#     local cmd="${1}"
#     eval ${cmd}
# }


# cmd="curl -X POST -d \"{\"peerId\": \"${peer_id}\"}\" -H 'Content-Type: application/json' --max-time 5 localhost:3001/api/v2/node/ping"

# try_cmd "${cmd}"
origin=${1:-localhost:3001}
peer_id="huje" 

result=$(curl -X POST -H "Content-Type: application/json" -d "{\"name\": ${peer_id}}" ${origin}/api/v2/node/ping)
echo $result

# curl -X POST -H "Content-Type: application/json" -d '{"name": "linuxize", "email": "linuxize@example.com"}' localhost:3001/api/v2/node/ping