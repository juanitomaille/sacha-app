# base image
FROM node:lts

# installe un simple serveur http pour servir un contenu statique
RUN npm install -g http-server

# set working directory
WORKDIR /app

# ajoute `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# copie 'package.json' et 'package-lock.json' (si disponible)
COPY package.json /app/package.json

# installe les dépendances du projet
RUN npm install

#RUN npm install @vue/cli@4.1.2 -g

# copie les fichiers et dossiers du projet dans le dossier de travail (par exemple : le dossier 'app')
COPY . /app

# start app
#CMD ["npm", "run", "serve"]

# construit l'app pour la production en la minifiant
#RUN npm run build

EXPOSE 8080
CMD [ "http-server", "dist" ]
