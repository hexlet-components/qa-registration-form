IMAGE_ID := ghcr.io/hexlet-components/qa-registration-form
PORT := 5039

install: 
	npm ci

build:
	npx vite build

start:
	npx serve -p $(PORT) dist

docker-build:
	docker build . -t $(IMAGE_ID)

docker-run:
	docker rm -f qa-registration-form
	docker run -e PORT=$(PORT) -p $(PORT):$(PORT) --name qa-registration-form $(IMAGE_ID)

docker-sh:
	docker run -e PORT=$(PORT) -it --entrypoint sh $(IMAGE_ID)
