push-image:
	gcloud auth configure-docker us-west1-docker.pkg.dev
	docker build -t web-client --platform linux/amd64 .
	docker tag web-client us-west1-docker.pkg.dev/personal-log-403105/web-client/image
	docker push us-west1-docker.pkg.dev/personal-log-403105/web-client/image
	