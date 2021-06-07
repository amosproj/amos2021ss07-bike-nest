while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' localhost:9000)" != "404" ]]
do
	sleep 5
done
while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' localhost:9001)" != "404" ]]
do
	sleep 5
done
while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' localhost:9002)" != "404" ]]
do
	sleep 5
done
while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' localhost:9003)" != "404" ]]
do
	sleep 5
done
while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' localhost:9004)" != "404" ]]
do
	sleep 5
done