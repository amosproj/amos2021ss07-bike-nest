from pyngrok import conf, ngrok

# Add personal AUTH TOKEN here or in ngrok config's .yml
conf.get_default().auth_token = "NGROK AUTH_TOKEN"
conf.get_default().region = "eu"
http_tunnel = ngrok.connect(5000)
tunnels = ngrok.get_tunnels()
ngrok_process = ngrok.get_ngrok_process()
print(tunnels)
try:
    # Block until CTRL-C or some other terminating event
    ngrok_process.proc.wait()
except KeyboardInterrupt:
    print(" Shutting down server.")

    ngrok.kill()


