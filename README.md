<p align="center">
  <a href="https://www.java-sc.com/">
    <img src="https://1.bp.blogspot.com/-qlH7GyLvZOs/XX0LSgsv7fI/AAAAAAAAIE4/Md8Bhpbu43wn3wxah9ZC08F40PFYU9JlwCK4BGAYYCw/s1600/PNG.png" alt="Logo" width="184" height="68px">
  </a>

  <h3 align="center">OS JSC-API</h3>
  <p align="center">
    OS JSC-API adalah contoh program API untuk penggunaan sehari-hari, program ini boleh di kembangkan ke tahap lanjutan oleh siapapun. Hanya saja contoh program ini tidak boleh dipatenkan atau menjadi hak milik bagi seseorang. Contoh program ini bersifat Open Source, saya sangat apresiasi apabila ada yang ikut mengembangkan ke pembuatan API lanjutan sehingga dapat membantu developer muda yang ingin belajar ataupun hanya menjadikan referensi. 
  </p>
</p>


## Table of contents

- [Fitur](#fitur)
- [Status](#status)
- [Setup](#setup)
- [Creators](#creators)

## Fitur

Apa saja yang ada di API ini ?

- Database sederhana
- API Register
- API Verifikasi Email
- API Login
- Middlewere autorization (next update)
- Upload file (next update)
- Access token (next update)

## Status

Dalam tahap pengembangan 

## Setup

Clone repo ini dengan ```git clone https://github.com/hadyjsc/hadyjsc-simple-api-node-js.git``` pada folder tujuan anda di local. Kemudian ubah nama .env.example menjadi .env dan isi dengan config yang anda gunakan. Karena dalam contoh program ini menggunakan database postgresql, berikut contoh config nya.
```
CENTRAL_PORT=4000
PG_HOST=localhost
PG_USERNAME=postgres
PG_PORT=5432
PASSWORD=root
PROD_PG_HOST=localhost
PROD_PG_USERNAME=postgres
PROD_PG_PORT=5432
PROD_PASSWORD=root
DATABASE=nama-database
SECRET=jsc2019
SERVICE=gmail
EMAIL=contohemail@gmail.com
PASS=passwordemail
SECRET_CONT=2019app
MAILJET_API_KEY=api_mail_jet
MAILJET_API_SECRET=secret_key_mail_jet
MAILJET_HOST=in.mailjet.com
NODE_ENV=development
SYSTEM_TITLE=OS JSC-API
API_DEPLOY=http://localhost:4000
ROOT_FOLDER=.
```

Untuk mendapatkan api dan secret key mailjet silahkan register di <a href="https://www.mailjet.com/">MailJet.com</a>.

## Creators

**Hady Eka Saputra - SI 2013**

- <https://github.com/hadyjsc>