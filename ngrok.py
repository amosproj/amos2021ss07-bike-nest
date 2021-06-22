from pyngrok import conf, ngrok

conf.get_default().auth_token = "1uCt6ypgyad7M1ZsMADleaSNX6Z_2xhnicnerQrkVs4XH4TvZ"
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


