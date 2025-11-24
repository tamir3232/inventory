# INVENTORY

Inventory terbagi 2 yaitu Backend dan frontend folder

## Installation - Backend

### Masuk ke dalam folder inventory-backend

lakukan Konfigurasi pada file .env

lalu setelah itu lakukan

```bash
npm install
```

Setelah itu masuk ke src/database
dan lakukan 
```bash
npx sequelize-cli db:migrate

npx sequelize-cli db:seed:all
```

lalu lakukan
``` bash 
npm run dev
```


## Installation - FrontEnd

### Masuk ke dalam folder inventory-backend
lakukan Konfigurasi pada file .env

lalu setelah itu lakukan

```bash
npm install
```
lalu
``` bash 
npm run dev
```



# LOGIC TAMBAHAN SEDIKIT

### 1. yang bisa melakukan edit hanya lah request purchase yang masih draft, jika selain draft akan di tolak

### 2. delete juga hanya bisa di lakukan lakukan untuk purchase request yang statusnya masih draft

### 3. untuk purchase request yang masih draft masih bisa melakukan penambahan items atau mengganti data selain REFERENCE

FE : http://72.61.208.173:3000/
BE : http://72.61.208.173:4000/
