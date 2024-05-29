function sequence() {
 
curl -X POST \
 -H "Content-Type: text/plain" \
 -d 'G2'\
 -s https://synchat.emmasea.com/syn

sleep 0.3 

curl -X POST \
 -H "Content-Type: text/plain" \
 -d 'A2'\
 -s https://synchat.emmasea.com/syn

sleep 0.6 

curl -X POST \
 -H "Content-Type: text/plain" \
 -d 'G2'\
 -s https://synchat.emmasea.com/syn

sleep 0.3 

curl -X POST \
 -H "Content-Type: text/plain" \
 -d 'G3'\
 -s https://synchat.emmasea.com/syn

sleep 0.3 
}

echo "This sequence will play til you quit the process."
while :; do sequence; sleep 1; done
