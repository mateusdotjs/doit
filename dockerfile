# Use uma imagem oficial do Node.js como base
FROM node:20.17-alpine3.20

# Crie e defina o diretório de trabalho
WORKDIR /app

# Copie o package.json e package-lock.json
COPY package*.json .

# Instale as dependências
RUN npm install

# Copiar o restante dos arquivos
COPY . .

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:dev"]
