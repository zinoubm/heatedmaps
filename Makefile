setup:
	docker compose up --build

up:
	docker compose up

up_d:
	docker compose up -d

up_sim:
	docker compose -f poduction-sim.docker-compose.yml up --build

terminal: 
	docker exec -it heatedmaps_dev-backend-1 /bin/bash

feeddb:
	docker exec -it heatedmaps_dev-backend-1 python manage.py feed_db

loaddata:
	docker exec -it heatedmaps_dev-backend-1 python manage.py loaddata fixtures/categories.json fixtures/users.json fixtures/products.json fixtures/orders.json fixtures/reviews.json

flush:
	docker exec -it heatedmaps_dev-backend-1 python manage.py flush --noinput 

db:
	psql -h localhost -p 5432 -d heatedmaps_dev_db -U heatedmaps_dev_db_user -W

make_migrations:
	docker exec -it heatedmaps_dev-backend-1 python manage.py makemigrations

migrate:
	docker exec -it heatedmaps_dev-backend-1 python manage.py migrate

down:
	docker compose down

schema:
	python manage.py spectacular --file schema.yml

test:
	docker compose run backend python -m pytest --reuse-db

unit_test:
	docker compose run backend python -m pytest --reuse-db -k test_cart.py

.PHONY: dev-image up bash down test rm build push

# must remove before pushing
load_terrafrom_vars:
	export $(cat terraform.env | xargs)

